
import { LoginBtn } from "../../components/Loginbtn"
import LoginCredentials from "@/app/components/LoginCredentials"


export default function Home() {
  

  return (
    <div className=" h-screen flex flex-col-reverse sm:flex-row gap-5 items-center justify-center">
      <LoginCredentials/>
      <LoginBtn />
    </div>
  )
}