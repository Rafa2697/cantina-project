import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export async function GET() {
    try {
        const pedidos = await prisma.order.findMany({
            orderBy: { createdAt: 'asc' },
            include: { items: true }
        });

        return NextResponse.json(pedidos, { status: 200 });
    } catch (error) {
        console.error(error)
    }
}


