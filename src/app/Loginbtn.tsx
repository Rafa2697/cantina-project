"use client"

import { signIn } from "next-auth/react"


export function LoginBtn(){
    return(
        <button onClick={() => signIn("google", {callbackUrl: "/dashboard"})}>
            Login with Google
        </button>
    )
}