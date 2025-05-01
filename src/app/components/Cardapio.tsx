import { useEffect, useState } from "react";
import Link from "next/link"
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
import { ArrowLeftToLine, LogIn } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

export default function Cardapio() {
    const [data, setData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [categories, setCategories] = useState<Category[]>([]);


    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await fetch("/api/cadastrarAlimento"); // Atualize o endpoint conforme necessário
            const result: DataItem[] = await response.json();
            setData(result);
            toast("Cantina aberta a partir das 18h.", {
                action: {
                  label: "Fechar",
                  onClick: () => console.log("Fechar"),
                },
              })
        } catch (error) {
            console.error('Error ao buscar dados: ', error)
        }
        setLoading(false)
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
    return (
        <div className="container mx-auto p-4 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <Link href="/">
                    <ArrowLeftToLine className="hover:text-red-600" />
                </Link>
                <Link href="/dashboard">
                    <LogIn className="hover:text-green-500" />
                </Link>
            </div>
            <h1 className="text-2xl font-bold mb-6 text-center">Cardápio</h1>
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
            
            {loading ? (
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
                            <p className="text-gray-600 mt-2">{item.description}</p>
                            <div className="mt-4 flex justify-between items-center">
                                <div className="flex flex-col sm:flex-row gap-2">
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
                                {item.imagemURL ? (<Image src={item.imagemURL} alt={item.name} width={96} height={96} className="w-24 mt-4 rounded-sm " />) : (
                                    <div></div>
                                )}

                            </div>



                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}