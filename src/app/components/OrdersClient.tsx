import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton"
import { format, parseISO } from 'date-fns';

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
            subtotal: string
        }
    ];
}

export default function OrdersClient() {
    const [data, setData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState(false)
    const { data: session } = useSession();
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

    async function deletarPedidos(id: string) {
        try {
            const responseDelete = await fetch(`/api/pedidos`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id, deleteMany: false})
            })
            if (responseDelete.ok) {
                // Atualiza a lista de pedidos após deletar
                fetchData();
            } else {
                console.error("Erro ao excluir pedido");
            }

        } catch (error) {
            console.error("Erro ao excluir pedido:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    const emailSessao = session?.user?.email;

    // Filtrar os pedidos com base no email da sessão
    const filteredData = data.filter(order => order.userEmail === emailSessao);

    return (
        <div>
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 w-full place-items-center justify-center">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                    {filteredData.map((order) => (
                        <div key={order.id} className="bg-slate-100 rounded-lg shadow-lg p-4">
                            <p className="text-gray-600 mb-2">Cliente: {order.userName}</p>
                            <p className="text-gray-600 mb-4">Status: {order.status}</p>
                            <p className="text-gray-600 mb-4">
                                Horário: {format(parseISO(order.createdAt), "dd/MM/yyyy 'às' HH:mm")}
                            </p>
                            <p className="text-gray-600 mb-4">
                                {order.status === "Concluído" ? `Pronto ${format(parseISO(order.updatedAt), "dd/MM/yyyy 'às' HH:mm")}` : "Preparando..."}
                            </p>
                            <div className="space-y-2">
                                {order.items.map((item) => (
                                    <div key={item.id} className="border-b pb-2">
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-gray-500">
                                            Quantidade: {item.quantity} | Subtotal: R$ {(Number(item.subtotal).toFixed(2).replace('.', ','))}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4 text-lg font-bold">
                                Total: R$ {(Number(order.totalPrice).toFixed(2).replace('.', ','))}
                            </p>
                            <button
                                onClick={() => deletarPedidos(order.id)}
                                className={`px-4 py-2 rounded-md bg-red-500 m-2 text-center text-white`}>
                                Cancelar pedido
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}