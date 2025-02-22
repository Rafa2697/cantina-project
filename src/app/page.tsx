import Link from "next/link"
import { LogIn } from 'lucide-react';

export default function Home() {
    return (
        <div className="container" >
            <div className=" flex flex-col sm:flex-row justify-around items-center h-svh " >

                <Link href="/signIn" className="border w-64 items-center justify-center h-1/4 flex gap-1 rounded-md bg-sky-400 hover:bg-sky-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-sky-700 text-white font-bold text-xl">
                    Login
                    <LogIn />
                </Link>
                <Link href="/pedidos" className="border w-64 items-center justify-center h-1/4 flex gap-1 rounded-md bg-orange-400 hover:bg-orange-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-orange-700 text-white font-bold text-xl">
                    Cardapio
                </Link>
            </div>
        </div>
    )
}