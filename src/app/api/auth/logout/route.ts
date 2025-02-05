import { cookies } from 'next/headers'
import { NextResponse } from "next/server";

export async function GET(name:any) {
  (await cookies()).set('name', '')
  return NextResponse.redirect(new URL("/", process.env.NEXTAUTH_URL)); // Redireciona para a página inicial
}