'use client'

import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import Image from 'next/image'

const Cabecalho: React.FC = () => {
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await getSession();
            setSession(sessionData);
        };

        fetchSession();
    }, []);

    if (!session) {
        return <div>Carregando...</div>;
    }


    return (
        <div className="bg-white px-4 py-2 shadow text-black flex justify-start items-center space-x-4">
            <img src={session.user?.image} alt="perfil" className='rounded-full' />
            <div>
                <p>Olá, {session.user?.name}</p>
                <p>{session.user?.email}</p>
            </div>

        </div>
    );
};

export default Cabecalho;