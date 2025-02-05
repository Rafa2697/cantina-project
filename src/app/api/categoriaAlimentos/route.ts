import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET() {
    const categoria = await prisma.category.findMany()

    return Response.json(categoria)
    
}

export async function POST(request:Request) {
    try {
        const data = await request.json()
        const {name} = data;
        const newCategoria = await prisma.category.create({
            data:{
                name
            }
        })

        return new Response(JSON.stringify({data: newCategoria}), {status:201});
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: "Error ao criar categoria"}), {status: 500})
    }
}