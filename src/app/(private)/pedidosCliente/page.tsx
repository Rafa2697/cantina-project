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

    const [refreshOrders, setRefreshOrders] = useState(false);

    const handleDeleteOrders = () => {
        setRefreshOrders((prev) => !prev); // Alterna o estado para forçar a atualização
    };

    if (!session) {
        return <div></div>
    }
    return (
        <div >

            {!session.user?.image ? (
                <div className="flex flex-col items-center">
                    <DeleteOrders onDeleteCompleted={handleDeleteOrders} />
                    <OrdersReceived refreshTrigger={refreshOrders} />
                </div>
            ) : (
                <OrdersClient />
            )}
        </div>

    )
}