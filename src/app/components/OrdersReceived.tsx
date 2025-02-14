// import { useEffect, useState } from "react";


// interface DataItem {
//     id: string;
//     userName: string;
//     userEmail: string;
//     status: string;
//     totalPrice: string;
//     items: [
//         {
//             id:string;
//             orderId: string;
//             foodId: string;
//             name: string;
//             quantity: number;
//             subtotal:string
//         }
//     ];
// }

export default function OrdersReceived() {
    // const [data, setData] = useState<DataItem[]>([]);
    // const [loading, setLoading] = useState(false)

    // const fetchData = async () => {
    //     setLoading(true)
    //     try {
    //         const response = await fetch("/api/items"); // Atualize o endpoint conforme necessário
    //         const result: DataItem[] = await response.json();
    //         setData(result);
    //     } catch (error) {
    //         console.error('Error ao buscar dados: ', error)
    //     }
    //     setLoading(false)
    // }
    // useEffect(() => {
    //     fetchData();
    // }, []);
    return (
        <h1>Pedidos recebidos para o administrador</h1>
    )
}