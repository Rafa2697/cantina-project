import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

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
    useEffect(() => {
        fetchData();
    }, []);
    const emailSessao = session?.user?.email;

    // Filtrar os pedidos com base no email da sessão
    const filteredData = data.filter(order => order.userEmail === emailSessao);
  
    return (
        <div>
            {loading ? (
                <p>carregando...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-2">
                    {filteredData.map((order) => (
                        <div key={order.id} className="bg-slate-100 rounded-lg shadow-lg p-4">
                            <p className="text-gray-600 mb-2">Cliente: {order.userName}</p>
                            <p className="text-gray-600 mb-4">Status: {order.status}</p>
                            <div className="space-y-2">
                                {order.items.map((item) => (
                                    <div key={item.id} className="border-b pb-2">
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-gray-500">
                                            Quantidade: {item.quantity} | Subtotal: R$ {item.subtotal}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4 text-lg font-bold">
                                Total: R$ {order.totalPrice}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}