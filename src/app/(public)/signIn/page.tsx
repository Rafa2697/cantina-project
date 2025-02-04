
import { LoginBtn } from "../../components/Loginbtn"
import LoginCredentials from "@/app/components/LoginCredentials"


export default function Home() {
  

  return (
    <main className=" h-auto flex gap-16 items-center justify-center bg-slate-400">
      <LoginCredentials/>
      <LoginBtn />
    </main>
  )
}