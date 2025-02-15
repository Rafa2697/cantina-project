import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()
// Interfaces para tipagem
interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }

export async function GET() {
    try {
        const pedidos = await prisma.order.findMany();

        return NextResponse.json(pedidos, { status: 200 });
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        return NextResponse.json({ message: 'Erro ao buscar pedidos' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json()
        const { items, email, name } = data;

        const totalPrice = items.reduce((acc: number, item: OrderItem) => acc + item.price * item.quantity, 0)
        const newOrder = await prisma.order.create({
            data: {
                userName: name,
                userEmail: email,
                status: "PENDING",
                totalPrice,
                items: {
                    create: items.map((item: OrderItem) => ({
                        foodId: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        subtotal: item.price * item.quantity,
                    }))
                },
            },
            include: { items: true }
        })
        return new Response(JSON.stringify({ data: newOrder }), { status: 201 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Error ao criar pedido" }), { status: 500 })
    }
}

export async function PUT(request:Request) {
    try {
        const data = await request.json()
        const {id, status} = data

        const updatedOrder = await prisma.order.update({
            where:{id},
            data:{
                status
            }
        })
        return new Response(JSON.stringify({ data: updatedOrder }), { status: 200 });
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({error: 'Erro ao atualizar'}), {status: 500})
    }
}

export async function DELETE(request:Request) {
    try {
        const {id} = await request.json()
                const pedido = await prisma.order.delete({
                    where:{
                        id
                    }
                })
        
                return NextResponse.json(pedido);
    } catch (error) {
        console.error(error)
       return new Response(JSON.stringify({error:'ERRO ao deletar pedido' }))
    }
    
}