import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Page() {

    const session = await getServerSession()

    if(!session){
        return redirect("/")
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