import Link from "next/link"

export default function Home(){
    return(
        <div >
            <h1 className="text-center py-2 font-bold">Cantina Fasupi</h1>
            <div className="flex justify-around h-screen items-center">
                <Link href="/signIn">
                    Login
                </Link>
                <Link href="/pedidos">
                    Cardapio
                </Link>
            </div>
        </div>
    )
}