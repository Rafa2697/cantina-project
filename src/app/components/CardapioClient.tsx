import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image";

interface DataItem {
    id: string;
    name: string;
    description: string;
    price: number;
    imagemURL: string;
    categoryId: string;
    isAvailable: boolean;
}

interface Category {
    id: string;
    name: string;
}

interface SelectedItem extends DataItem {
    quantity: number;
}

export default function CardapioClient() {
    const [data, setData] = useState<DataItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
    const { data: session } = useSession();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchData = async () => {
        try {
            const response = await fetch("/api/cadastrarAlimento");
            const result: DataItem[] = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error ao buscar dados: ', error)
        }
    }
    const fetchCategories = async () => {
        try {
            const response = await fetch("/api/categoriaAlimentos");
            const result = await response.json();
            setCategories(result);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchCategories();
    }, []);


    // Função para obter o nome da categoria pelo ID
    const getCategoryName = (categoryId: string) => {
        if (categoryId === 'all') return 'Todos';
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : categoryId;
    };

    //função para obter categorias únicas
    const getUniqueCategories = () => {
        const uniqueCategoryIds = ['all', ...new Set(data.map(item => item.categoryId))];
        return uniqueCategoryIds;
    };

    //função para filtrar items
    const filteredItems = data.filter(item =>
        selectedCategory === 'all' ? true : item.categoryId === selectedCategory
    )

    const handleAddItem = (item: DataItem) => {
        if (!item.isAvailable) return;

        setSelectedItems(prev => {
            const existingItem = prev.find(i => i.id === item.id);
            if (existingItem) {
                return prev.map(i =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const handleRemoveItem = (itemId: string) => {
        setSelectedItems(prev => prev.filter(item => item.id !== itemId));
    };
    const handleSubmitOrder = async () => {
        if (!session?.user?.email) {
            alert('Você precisa estar logado para fazer o pedido')
            return;
        }
        try {
            const response = await fetch('/api/pedidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: selectedItems,
                    email: session.user.email,
                    name: session.user.name
                }),
            });
            if (response.ok) {
                toast('Pedido enviado com sucesso! Verfique em Pedidos.');
                setSelectedItems([]);
            }
        } catch (error) {
            console.error('Erro ao enviar pedido:', error);
            alert('Erro ao enviar pedido');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="sticky top-0 bg-white p-4 shadow-md rounded-lg mb-4">
                <h1 className="sm:text-2xl font-bold mb-6 text-center">Selecione os itens para pedidos</h1>
                {selectedItems.length > 0 && (
                    <div>
                        <h2 className="text-center sm:text-end text-green-800 font-bold">Items adicionados</h2>
                        <p className="text-center sm:text-end text-xs sm:text-sm">Envie o pedido a cima</p>
                    </div>
                )}
            </div>
            <div className="flex gap-2 mb-4 overflow-x-auto py-2">
                {getUniqueCategories().map((categoryId) => (
                    <button
                        key={categoryId}
                        onClick={() => setSelectedCategory(categoryId)}
                        className={`px-4 py-2 rounded-full whitespace-nowrap
                            ${selectedCategory === categoryId
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 text-gray-700'}`}
                    >
                        {getCategoryName(categoryId)}
                    </button>
                ))}
            </div>
            {/* Lista de itens selecionados */}
            {selectedItems.length > 0 && (

                <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                    <h2 className="text-xl font-bold mb-4 text-center">Itens Selecionados</h2>
                    <div className="space-y-4">
                        {selectedItems.map(item => (
                            <div key={item.id} className="flex flex-wrap justify-center sm:justify-between items-center border-b-2 pb-2 gap-2 text-sm sm:text-base">
                                <span className="w-full sm:w-auto text-center sm:text-start">{item.name} (x{item.quantity} )</span>
                                <span className="w-full sm:w-auto font-semibold text-center sm:text-start">R${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                                <button
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="mt-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                >
                                    Remover
                                </button>
                            </div>

                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-evenly items-center mt-4 gap-3">
                        <button
                            onClick={handleSubmitOrder}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto"
                        >
                            Enviar Pedido
                        </button>
                        <div>
                            {
                                <div>
                                    <strong>Total: R${(selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2).replace('.', ','))}</strong>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            )}

            {/* Grid de items do cardápio */}
            {data.length === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-auto w-full place-items-center justify-center">
                    <Skeleton className="w-60 h-52 rounded-sm" />
                    <Skeleton className="w-60 h-52 rounded-sm" />
                    <Skeleton className="w-60 h-52 rounded-sm" />
                    <Skeleton className="w-60 h-52 rounded-sm" />
                    <Skeleton className="w-60 h-52 rounded-sm" />
                    <Skeleton className="w-60 h-52 rounded-sm" />
                    <Skeleton className="w-60 h-52 rounded-sm" />
                    <Skeleton className="w-60 h-52 rounded-sm" />
                    <Skeleton className="w-60 h-52 rounded-sm" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                            <h2 className="text-xl font-semibold">{item.name}</h2>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-600 mt-2 text-xs sm:text-lg">{item.description}</p>
                                {item.imagemURL ? (<Image src={item.imagemURL} alt={item.name} width={96} height={96} className="w-20 mt-4 rounded-sm " />) : (
                                    <div></div>
                                )}
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-xs sm:text-lg font-bold">
                                    R$ {(Number(item.price).toFixed(2).replace('.', ','))}
                                </span>
                                <div className="flex items-center space-x-2">
                                    <span className={`px-2 py-1 rounded-full text-sm ${item.isAvailable
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                        {item.isAvailable ? 'Disponível' : 'Indisponível'}
                                    </span>
                                    {item.isAvailable && (
                                        <button
                                            onClick={() => handleAddItem(item)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        >
                                            Adicionar
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}