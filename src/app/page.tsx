import Link from "next/link"

export default function Home(){
    return(
        <div>
            <h1>pagina inicial</h1>
            <Link href="/signIn">
                Login
            </Link>
        </div>
    )
}