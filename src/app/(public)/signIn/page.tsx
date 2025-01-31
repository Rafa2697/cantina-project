
import { LoginBtn } from "../../components/Loginbtn"
import LoginCredentials from "@/app/components/LoginCredentials"


export default function Home() {
  

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <LoginCredentials/>
      <LoginBtn />
    </main>
  )
}