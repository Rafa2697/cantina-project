import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Providers } from '../../providers/page';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../components/AppSidebar";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Cantina UNISEPE",
    description: "Aplicativo de pedidos para a Cantina do UNISEPE",
};

export default function PrivateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-orange-600 bg-opacity-30`}
        >
            <SidebarProvider>

                <AppSidebar />
                <SidebarTrigger />

                <Providers>

                    {children}
                    <Toaster />
                </Providers>
            </SidebarProvider>

        </div>

    );
}
