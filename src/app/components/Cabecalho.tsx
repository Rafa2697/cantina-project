'use client'

import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth'
import Image from 'next/image';
import { Skeleton } from "@/components/ui/skeleton"

const Cabecalho: React.FC = () => {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await getSession();
            setSession(sessionData);
        };

        fetchSession();
    }, []);

    console.log(session?.user?.image)
    if (!session) {
        return (
            <div className="flex flex-col items-center space-y-2 px-4 py-2 text-black">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-52" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        )

    }


    return (
        <div className=" px-4 py-2 text-black flex flex-col justify-start items-center space-x-4">

            {!session.user?.image ? (
                <div>
                    <p>Olá, {session.user?.name}</p>
                </div>
            ) : (
                <div className='flex flex-col items-center space-y-2'>
                    <Image
                        src={session.user.image}
                        alt="perfil"
                        width={64}  // 16 * 4 (w-16)
                        height={64} // 16 * 4 (h-16)
                        className='rounded-full object-cover'
                        priority
                    />
                    <p>Olá, {session.user?.name}</p>
                    <p>{session?.user?.email}</p>
                </div>
            )}




        </div>
    );
};

export default Cabecalho;