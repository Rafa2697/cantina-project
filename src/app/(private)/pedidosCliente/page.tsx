'use client'
import OrdersClient from "@/app/components/OrdersClient"
import OrdersReceived from "@/app/components/OrdersReceived"
import { getSession, Session } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

export default function PedidosCliente() {
    const [session, setSession] = useState<Session | null>(null);
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
        <div>
            <h1>pagina onde os itens selecionados vão aparecer para finalizar o pedido. </h1>
            {!session.user?.image ? (
                <OrdersReceived />
            ) : (
                <OrdersClient />
            )}
        </div>

    )
}