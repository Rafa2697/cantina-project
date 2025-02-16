import React, { useEffect, useState } from "react";


interface DataItem {
    id: string;
    userName: string;
    userEmail: string;
    status: string;
    totalPrice: string;
    items: [
        {
            id: string;
            orderId: string;
            foodId: string;
            name: string;
            quantity: number;
            subtotal: string
        }
    ];
}

export default function OrdersReceived() {
    const [data, setData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await fetch("/api/items"); // Atualize o endpoint conforme necessário
            const result: DataItem[] = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error ao buscar dados: ', error)
        }
        setLoading(false)
    }
    useEffect(() => {
        fetchData();
    }, []);

    const updateStatus = async (orderId: string) => {
        try {
            const response = await fetch(`/api/pedidos`, {
                method: "PUT",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({
                    id: orderId,
                    status: "Concluído"
                })
            })
            if (response.ok) {
                // Atualiza o estado local para refletir a mudança no status
                setData(prevData =>
                    prevData.map(order =>
                        order.id === orderId ? { ...order, status: "Concluído" } : order
                    )
                );
            } else {
                console.error("Erro ao atualizar o status do pedido");
            }
        } catch (error) {
            console.error("Erro ao enviar dados: ", error)
        }
    }

    const deletionAllOrders = (orderId: string) => {
        setTimeout(async () => {
            try {
                await fetch("/api/pedidos", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(orderId)
                })
                console.log(orderId)
                // Atualiza o estado removendo o pedido
                setData(prevData => prevData.filter(order => order.id !== orderId));
            } catch (error) {
                console.error("Erro ao excluir pedido:", error);
            }
        }, 2000)
    }
    return (
        <div>
            {loading ? (
                <div>
                    <p>carregando...</p>
                </div>
            ) : (
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    
                    {data.map((order) => (
                        <div key={order.id} className="bg-white rounded-lg shadow-md p-4">
                            <p className="text-gray-600 mb-2">Cliente:{order.userName}</p>
                            <p className="text-gray-600 mb-4">Identificação:{order.userEmail}</p>
                            <p className="text-gray-600 mb-4">status:{order.status}</p>
                            <div className="space-y-2">
                                {order.items.map((item) => (
                                    <div key={item.id} className="border-b pb-2">
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-gray-500">
                                            Quantidade: {item.quantity} | Subtotal: R$ {item.subtotal}
                                        </p>
                                    </div>
                                ))}
                                <p className="mt-4 text-lg font-bold">
                                    Total: R$ {order.totalPrice}
                                </p>
                                <button
                                    onClick={() => updateStatus(order.id)}
                                    className={`px-4 py-2 rounded-md ${order.status === "Concluído"
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-green-500 hover:bg-green-600"
                                        } text-white`}
                                    disabled={order.status === "Concluído"}
                                >
                                    {order.status === "Concluído" ? "Pedido Finalizado" : "Finalizar Pedido"}
                                </button>
                            </div>
                        </div>
                    ))}
                    
                </div>
            )}
        </div>
    )
}