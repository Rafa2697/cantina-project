'use client'

import React, { useEffect, useState } from 'react';
import { getSession, Session } from 'next-auth/react';
import Image from 'next/image';

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
        return <div>Carregando...</div>;
    }


    return (
        <div className=" px-4 py-2 text-black flex flex-col justify-start items-center space-x-4">

            {!session.user?.image ? (
                <div>
                    <p>Administrador</p>
                    <p>Olá, {session.user?.name}</p>
                </div>
            ) : (
                <div>
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