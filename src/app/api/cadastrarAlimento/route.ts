import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(){
    const alimento = await prisma.menuItem.findMany({
        orderBy:{
            createdAt:'asc'
        },
        include:{
            category:true
        }
    })

    return Response.json(alimento)
}

export async function POST(request: Request){
    try{
        const data = await request.json()
        const {name, description, price, imagemURL, categoryId, isAvailable} = data;
        const newAlimento = await prisma.menuItem.create({
            data:{
                name,
                description,
                price,
                imagemURL,
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

export async function PUT(request:Request){
    try{
        const data = await request.json()
        const {id, name, description, price,imagemURL, categoryId, isAvailable} = data

        const updatedAlimento = await prisma.menuItem.update({
            where: {
                id
            },
            data:{
                name,
                description,
                price,
                imagemURL,
                categoryId,
                isAvailable
            }
        });
        return new Response(JSON.stringify({ data: updatedAlimento }), { status: 200 });
    } catch(error){
        console.error(error)
        return new Response(JSON.stringify({error: 'Erro ao atualizar'}), {status: 500})
    }
}