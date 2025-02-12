"use client"; // Indica que este é um Client Component

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton
} from "@/components/ui/sidebar";

import { signOut } from "next-auth/react"
import Cabecalho from "./Cabecalho";
import { Home, ShoppingBag, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

// Menu items.
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Pedidos",
        url: "/pedidosCliente",
        icon: ShoppingBag,
    },
    {
        title: "Sair",
        url: "#", // Mantenha como "#" ou remova o URL
        icon: LogOut,
    }
];

export function AppSidebar() {
    const router = useRouter();

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
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <Cabecalho />
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