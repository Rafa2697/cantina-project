'use client'

import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';


const Cabecalho: React.FC = () => {
    const [session, setSession] = useState<any>(null);

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
                    <img src={session.user.image} alt="perfil" className='rounded-full w-16 h-16 object-cover' />
                    <p>Olá, {session.user?.name}</p>
                    <p>{session?.user?.email}</p>
                </div>
            )}




        </div>
    );
};

export default Cabecalho;