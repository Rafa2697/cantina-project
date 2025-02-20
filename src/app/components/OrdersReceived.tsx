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

export default function OrdersReceived({ refreshTrigger }: {refreshTrigger: boolean}) {
    const [data, setData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await fetch("/api/items");
            const result: DataItem[] = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error ao buscar dados: ', error)
        }
        setLoading(false)
    }
    useEffect(() => {
        fetchData();
    },  [refreshTrigger]);

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
                            <p className="text-gray-600 mb-2 text-sm">Cliente:{order.userName}</p>
                            <p className="text-gray-600 mb-4 text-xs">Identificação:{order.userEmail}</p>
                            <p className="text-gray-600 mb-4 text-sm">status:{order.status}</p>
                            <div className="space-y-2">
                                {order.items.map((item) => (
                                    <div key={item.id} className="border-b pb-2">
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-gray-500">
                                            Quantidade: {item.quantity} | Subtotal: R$ {(Number(item.subtotal).toFixed(2).replace(".", ","))}
                                        </p>
                                    </div>
                                ))}
                                <p className="mt-4 text-lg font-bold">
                                    Total: R$ {(Number(order.totalPrice).toFixed(2).replace(".", ","))}
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