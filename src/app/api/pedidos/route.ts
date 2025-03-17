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

export async function PUT(request: Request) {
    try {
        const data = await request.json()
        const { id, status } = data

        const updatedOrder = await prisma.order.update({
            where: { id },
            data: {
                status
            }
        })
        return new Response(JSON.stringify({ data: updatedOrder }), { status: 200 });
    } catch (error) {

        console.error(error)
    }
}

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { id, deleteMany } = body;

        // Se deleteMany for true, exclui todos os pedidos concluídos
        if (deleteMany) {
            const pedidos = await prisma.order.deleteMany({
                where: {
                    status: "Concluído"
                }
            });
            return NextResponse.json({ 
                message: "Pedidos concluídos deletados com sucesso", 
                data: pedidos 
            });
        }

        // Caso contrário, exclui apenas o pedido específico que esteja concluído
        const pedidoDeletado = await prisma.order.delete({
            where: {
                id: id
            }
        });

        return NextResponse.json({ 
            message: "Pedido deletado com sucesso", 
            data: pedidoDeletado 
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Erro ao deletar pedido(s)" },
            { status: 500 }
        );
    }
}


