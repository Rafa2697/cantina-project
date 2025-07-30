import Link from "next/link"
import { LogIn } from 'lucide-react';
export default function Home() {
    
    return (
        <div className="container n bg-fundo-mobile sm:bg-fundo-desktop bg-cover bg-center bg-no-repeat">
            <div className="h-screen flex flex-col justify-center" >
                <div className=" flex flex-col sm:flex-row justify-around items-center h-5/6">
                    <Link href="/signIn" className="border w-64 items-center justify-center h-1/4 flex gap-1 rounded-md bg-sky-400 hover:bg-sky-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-sky-700 text-white font-bold text-xl">
                        Login
                        <LogIn />
                    </Link>
                    <Link href="/pedidos" className="border w-64 items-center justify-center h-1/4 flex gap-1 rounded-md bg-orange-400 hover:bg-orange-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-orange-700 text-white font-bold text-xl">
                        Cardápio
                    </Link>
                    <Link href="/signInAdmin" className="border w-64 items-center justify-center h-1/4 flex gap-1 rounded-md bg-gray-600 hover:bg-gray-700 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-orange-700 text-white font-bold text-xl">
                        Administrador
                    </Link>
                </div>
                <p className="text-center bg-slate-100 w-40 mx-auto rounded-sm hover:text-sky-700">&copy;<a href="https://www.rafaeldev.com/" target="_blank"> rafaeldev.com</a></p>
            </div>
            
        </div>
    )
}