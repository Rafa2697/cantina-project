'use client'

import { useSession } from "next-auth/react"
import DashAdministrador from "@/app/components/DashAdministrador"
import DashClient from "@/app/components/DashCliente"
import { Skeleton } from "@/components/ui/skeleton"

export default function Page() {
  const { data: session } = useSession()
  console.log(session)
  if (!session) {
    return null
  }

  return (
    <div className="w-full flex">
      
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