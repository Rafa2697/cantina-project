import Link from "next/link"
import { LogIn } from 'lucide-react';

export default function Home() {
    return (
        <div className="container flex flex-col justify-around items-center h-svh">
            <h1 className="text-center py-3 font-bold">Cantina Fasupi</h1>
            <div className="container flex flex-col sm:flex-row justify-around items-center h-svh" >

                <Link href="/signIn" className="border w-64 items-center justify-center h-1/4 flex gap-1 rounded-md bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 text-white font-bold text-xl">
                    Login
                    <LogIn />
                </Link>
                <Link href="/pedidos" className="border w-64 items-center justify-center h-1/4 flex gap-1 rounded-md bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 text-white font-bold text-xl">
                    Cardapio
                </Link>
            </div>
        </div>
    )
}