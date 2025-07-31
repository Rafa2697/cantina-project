"use client"; // Indica que este é um Client Component

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarHeader
} from "@/components/ui/sidebar";

import { signOut } from "next-auth/react"
import Cabecalho from "./Cabecalho";
import { Home, ShoppingBag, LogOut, SquareMenu } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth'
import React, { useEffect, useState } from 'react';

// Menu items.<SquareMenu />
const items = [
    {
        title: "Home",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Pedidos",
        url: "/pedidosCliente",
        icon: ShoppingBag,
    },
    {
        title: "Cardápio",
        url: "/pedidos",
        icon: SquareMenu,
    },
    {
        title: "Sair",
        url: "#", // Mantenha como "#" ou remova o URL
        icon: LogOut,
    }
];

export function AppSidebar() {
    const router = useRouter();
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await getSession();
            setSession(sessionData);
        };

        fetchSession();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut({ redirect: false })
            const response = await fetch("/api/auth/logout", { method: "GET" });
            if (response.ok) {
                router.push("/"); // Redireciona para a página inicial após o logout
            }
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };

    return (
        <Sidebar collapsible="icon" variant="floating">

            <SidebarContent>
                <SidebarHeader>
                    <Cabecalho />
                </SidebarHeader>
                <SidebarGroupLabel className="mx-auto">{session?.user.name}</SidebarGroupLabel>
                <SidebarGroupLabel className="mx-auto">{session?.user.email}</SidebarGroupLabel>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        {item.title === "Sair" ? (
                                            <button
                                                onClick={handleLogout}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', width: '100%' }}
                                            >
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </button>
                                        ) : (
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        )}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}