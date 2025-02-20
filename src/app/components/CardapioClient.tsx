import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface DataItem {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryId: string;
    isAvailable: boolean;
}

interface SelectedItem extends DataItem {
    quantity: number;
}

export default function CardapioClient() {
    const [data, setData] = useState<DataItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
    const { data: session } = useSession();

    const fetchData = async () => {
        try {
            const response = await fetch("/api/cadastrarAlimento");
            const result: DataItem[] = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error ao buscar dados: ', error)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

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
    console.log(selectedItems, session?.user?.name)
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
                alert('Pedido enviado com sucesso!');
                setSelectedItems([]);
            }
        } catch (error) {
            console.error('Erro ao enviar pedido:', error);
            alert('Erro ao enviar pedido');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Selecione os itens para pedidos</h1>

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold">{item.name}</h2>
                        <p className="text-gray-600 mt-2 text-xs sm:text-lg">{item.description}</p>
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
        </div>
    );
}