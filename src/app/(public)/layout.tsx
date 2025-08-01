
import "../globals.css";
import { Providers } from '../../providers/page';



export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div
            className={`antialiased bg-blue-400 bg-opacity-40 w-full`}
        >
            <Providers>
                {children}
            </Providers>
        </div>

    );
}
