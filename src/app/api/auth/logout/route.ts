
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.redirect(new URL("/", process.env.NEXTAUTH_URL)); // Redireciona para a página inicial
}