'use client'

import { useSession } from "next-auth/react"
import DashAdministrador from "@/app/components/DashAdministrador"
import DashClient from "@/app/components/DashCliente"

export default function Page() {
  const { data: session, status } = useSession()
  console.log(session)
  if (!session) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>dashboard</h1>
      {!session.user?.image ? (
        <div>
          <DashAdministrador/>
        </div>
      ) : (
        <div>
          <DashClient/>
        </div>
      )}
    </div>
  )
}