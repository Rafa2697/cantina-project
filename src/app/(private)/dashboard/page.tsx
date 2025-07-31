'use client'

import { useSession } from "next-auth/react"
import DashAdministrador from "@/app/components/DashAdministrador"
import DashClient from "@/app/components/DashCliente"

export default function Page() {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  return (
    <div className="w-11/12 flex">
      
      {!session.user?.image ? (
        <div className="w-full">
          <DashAdministrador/>
        </div>
      ) : (
        <div className="w-full">
          <DashClient/>
        </div>
      )}
    </div>
  )
}