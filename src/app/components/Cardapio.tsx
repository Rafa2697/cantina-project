import { useEffect, useState } from "react";
import Link from "next/link"
interface DataItem {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryId: string;
    isAvailable: boolean;
}
import {ArrowLeftToLine } from "lucide-react";

export default function Cardapio() {
    const [data, setData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await fetch("/api/cadastrarAlimento"); // Atualize o endpoint conforme necessário
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

    return (
        <div className="container mx-auto p-4">
            <Link href="/">
            <ArrowLeftToLine className="hover:text-red-600" />
                </Link>
            <h1 className="text-2xl font-bold mb-6 text-center">Cardápio</h1>
            {loading ? (
                <p>carregando...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                            <h2 className="text-xl font-semibold">{item.name}</h2>
                            <p className="text-gray-600 mt-2">{item.description}</p>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-lg font-bold">
                                R$ {Number(item.price).toFixed(2).replace('.', ',')}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-sm ${item.isAvailable
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}>
                                    {item.isAvailable ? 'Disponível' : 'Indisponível'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}