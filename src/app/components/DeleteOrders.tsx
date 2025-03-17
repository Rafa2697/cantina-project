

export default function DeleteOrders({ onDeleteCompleted }: {onDeleteCompleted: () => void}) {

    async function deletarPedidos() {
        try {
            await fetch("/api/pedidos", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ deleteMany: true })
            })
            // Chama o callback para atualizar os pedidos na tela
            onDeleteCompleted(); // Notifica o pai para atualizar os pedidos
        } catch (error) {
            console.error("Erro ao excluir pedido:", error);
        }
    }
    return (
        <button
            onClick={deletarPedidos}
            className={`px-4 py-2 rounded-md bg-red-500 m-2 text-center text-white`}>
            Deletar pedidos concluídos
        </button>
    )
}