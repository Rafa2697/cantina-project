import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Providers } from '../../providers/page';



export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div
            className={`antialiased bg-orange-300  w-full`}
        >
            <Providers>
                {children}
            </Providers>
        </div>

    );
}
