import { useEffect, useState } from "react";

interface DataItem {
    id: string;
    name: string;
    description: string;
    price: number;
    imagemURL: string;
    categoryId: string;
    isAvailable: boolean;
}
interface DataCategory {
    id: string;
    name: string;
}

export default function CadastroItens() {
    const [data, setData] = useState<DataItem[]>([]);
    const [category, setCategory] = useState<DataCategory[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        imagemURL: '',
        categoryId: '',
        isAvailable: false
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    //pegar itens cadastrados
    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await fetch("/api/cadastrarAlimento")
            const result: DataItem[] = await response.json()
            setData(result)
        } catch (error) {
            console.error("Error ao buscar dados: ", error)
        }
        setLoading(false)
    }
    // Atualizar lista ao carregar o componente
    useEffect(() => {
        fetchData();
        fetchDatacategory();
    }, []);

    //pegar categorias de alimentos
    const fetchDatacategory = async () => {
        try {
            const response = await fetch("/api/categoriaAlimentos")
            const resultCategory: DataCategory[] = await response.json()
            setCategory(resultCategory)
        } catch (error) {
            console.error("Erro ao solicitar categoria: ", error)
        }
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica para enviar os dados

        try {
            if (editingId) {
                const updateData = {
                    ...formData,
                    id: editingId
                };

                await fetch('/api/cadastrarAlimento',{
                    method:"PUT",
                    headers:{"Content-Type": "application/json"},
                    body: JSON.stringify(updateData)
                });
            } else {
                await fetch("/api/cadastrarAlimento", {
                    method: "POST",
                    headers: { "Content-Type": "applicatoin/json" },
                    body: JSON.stringify(formData)
                })
            }
            setEditingId(null);
            fetchData()
        } catch (error) {
            console.error("Erro ao enviar dados: ", error)
        }

    };

    const getCategoryName = (categoryId: string) => {
        const foundCategory = category.find(cat => cat.id === categoryId);
        return foundCategory ? foundCategory.name : 'Categoria não encontrada';
    };

    //função para deletar uma categoria cadastrada
    const handleDelete = async (id: string) => {
        const dadosRequest = {
            id
        }
        try {
            const response = await fetch(`/api/cadastrarAlimento`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosRequest)
            });


            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }

            await fetchData(); // Atualiza a lista após deletar com sucesso
            alert("Item excluído com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir o dado:", error);
            alert("Erro ao excluir o item. Tente novamente.");
        }
    };

    //Prencher formulario para edição
    const handleEdit = (item: DataItem) => {
        console.log(item.id)
        setFormData({
            name: item.name,
            description: item.description,
            price: item.price.toString(),
            imagemURL: item.imagemURL,
            categoryId: item.categoryId,
            isAvailable: item.isAvailable
        });
        setEditingId(item.id);
    }

    return (
        <div className="container mx-auto p-4 flex gap-3">
            <div className="w-1/2">
                <h1 className="text-2xl font-bold mb-6 text-center">Cadastrar Itens</h1>

                <form onSubmit={handleSubmit} className="  bg-white p-3 rounded-lg shadow-md border border-gray-300">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                            Nome do Item
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                            Descrição
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                            Preço
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            step="0.01"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="imagemURL" className="block text-gray-700 font-medium mb-2">
                            URL da Imagem
                        </label>
                        <input
                            type="url"
                            id="imagemURL"
                            name="imagemURL"
                            value={formData.imagemURL}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="categoryId" className="block text-gray-700 font-medium mb-2">
                            Categoria
                        </label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Selecione uma categoria</option>
                            {category.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="isAvailable"
                                checked={formData.isAvailable}
                                onChange={handleChange}
                                className="mr-2 rounded"
                            />
                            <span className="text-gray-700">Disponível para venda</span>
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {editingId ? "Atualizar" : "Cadastrar"}
                    </button>
                </form>
            </div>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <div className="w-1/2">
                    <h1 className="text-2xl font-bold mb-6 text-center">Itens já cadastrados</h1>
                    <ul className="space-y-4  overflow-y-scroll h-auto">
                        {data.map((item) => (
                            <li
                                key={item.id}
                                className="flex items-center justify-between p-4 border border-teal-950 rounded-md"
                            >
                                <div>
                                    <p className="text-lg font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">{item.price}</p>
                                    <p className="text-sm text-gray-500">{item.description}</p>
                                    <p className="text-sm text-gray-500">{getCategoryName(item.categoryId)}</p>
                                    <p className={`text-sm ${item.isAvailable ? "text-green-600" : "text-red-600"}`}>
                                        {item.isAvailable ? "Ativo" : "Inativo"}
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>


            )}
        </div>
    );
}