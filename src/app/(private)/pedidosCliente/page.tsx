'use client'
import OrdersClient from "@/app/components/OrdersClient"
import OrdersReceived from "@/app/components/OrdersReceived"
import DeleteOrders from "@/app/components/DeleteOrders";
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
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
            <DeleteOrders/>
            {!session.user?.image ? (
                <OrdersReceived />
            ) : (
                <OrdersClient />
            )}
        </div>

    )
}