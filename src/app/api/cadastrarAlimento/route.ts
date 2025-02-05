import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(){
    const alimento = await prisma.menuItem.findMany()

    return Response.json(alimento)
}

export async function POST(request: Request){
    try{
        const data = await request.json()
        const {name, description, price, categoryId, isAvailable} = data;
        const newAlimento = await prisma.menuItem.create({
            data:{
                name,
                description,
                price,
                categoryId,
                isAvailable
            }
        })

        return new Response(JSON.stringify({ data: newAlimento }), { status: 201 });
    }catch(error){
        console.error(error);
        return new Response(JSON.stringify({ error: 'Erro ao inserir alimento' }), { status: 500 });
    }
}

export async function DELETE(request:Request) {
    try{
        const {id} = await request.json()
        const alimento = await prisma.menuItem.delete({
            where:{
                id
            }
        })

        return NextResponse.json(alimento);
    }catch( error){
        console.error(error)
       return new Response(JSON.stringify({error:'ERRO ao deletar alemento' }))
    }
    
}