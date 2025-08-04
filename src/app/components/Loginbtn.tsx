"use client"
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react"



export function LoginBtn(){
    return(
        <button onClick={() => signIn("google", {callbackUrl: "/dashboard"})}>
            <div className="flex items-center justify-center gap-2 border w-64 h-16 rounded-md bg-white hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 text-black hover:text-white font-bold text-xl max-w-sm shadow-md">
                <FcGoogle className="text-3xl"/>
                Acesso do aluno
            </div>
        </button>
     
    )
}