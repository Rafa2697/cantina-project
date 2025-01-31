
import { getServerSession } from "next-auth"

export default async function Page() {

    const session = await getServerSession()

    if(!session){
        return console.log('Não está logado')
    }
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This page is only visible to authenticated users.</p>
      <p>Olá, {session.user?.name}</p>
      <p>{session.user?.image}</p>
      <p>{session.user?.email}</p>
    </div>
  )
}