

export default  function DeleteOrders(){

    async function deletarPedidos(){
        try {
            await fetch("/api/pedidos", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            })
        } catch (error) {
            console.error("Erro ao excluir pedido:", error);
        }
    }
    return(
        <button
            onClick={() => deletarPedidos()}
        >
            Deletar pedidos concluídos
        </button>
    )
}