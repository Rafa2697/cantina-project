import React, { useEffect, useState } from "react";
import { format, parseISO } from 'date-fns';
import { useSession } from "next-auth/react"

interface DataItem {
    id: string;
    createdAt: string;
    updatedAt: string;
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
            subtotal: string;
            unidade: string;
        }
    ];
}

export default function OrdersReceived({ refreshTrigger }: { refreshTrigger: boolean }) {
    const [data, setData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState(false)
    const { data: sessionData } = useSession()

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
    }, [refreshTrigger]);

    const updateStatus = async (orderId: string) => {
        const nowISOString = new Date().toISOString(); // Gera o timestamp atual
        try {
            const response = await fetch(`/api/pedidos`, {
                method: "PUT",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({
                    id: orderId,
                    status: "Concluído",
                    updatedAt: nowISOString
                })
            })
            if (response.ok) {
                // Atualiza o estado local para refletir a mudança no status e no horário de conclusão
                setData(prevData =>
                    prevData.map(order =>
                        order.id === orderId ? { ...order, status: "Concluído", updatedAt: nowISOString } : order)
                );
            } else {
                console.error("Erro ao atualizar o status do pedido");
            }
        } catch (error) {
            console.error("Erro ao enviar dados: ", error)
        }
    }

    const getUnidade = () => {
        if (!sessionData?.user.name) return "";
        if (sessionData.user.name === "fpbe") return "peruibe";
        if (sessionData.user.name === 'fasupi') return 'itanhaem';

        return "";
    }
    const unidade = getUnidade();

    return (
        <div>
            {loading ? (
                <div>
                    <p>carregando...</p>
                </div>
            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    {data
                    .filter(order => order.items.some(item => item.unidade === unidade))
                    .map((order) => (
                        <div key={order.id} className="bg-white rounded-lg shadow-md p-4">
                            <p className="text-gray-600 mb-2 text-sm">Cliente:{order.userName}</p>
                            <p className="text-gray-600 mb-4 text-xs">Identificação:{order.userEmail}</p>
                            <p className="text-gray-600 mb-4 text-sm">status:{order.status}</p>
                            <p className="text-gray-600 mb-4">
                                Horário do pedido: {format(parseISO(order.createdAt), "dd/MM/yyyy 'às' HH:mm")}
                            </p>
                            <p className="text-gray-600 mb-4">
                                Pedido concluído: {format(parseISO(order.updatedAt), "dd/MM/yyyy 'às' HH:mm")}
                            </p>
                            <div className="space-y-2">
                                {order.items.map((item) => (
                                    <div key={item.id} className="border-b pb-2">
                                        <p className="font-medium">{item.name}</p>
                                        <p className="font-medium">{item.unidade}</p>
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