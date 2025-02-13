import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(){

}

export async function POST(request:Request) {
    try {
        const data = await request.json()
        const [id, userId, status, total] = data;
        const newOrder = await prisma.order.create({
            data:{
                id,
                userId,
                status,
                total
            }
        })
        return new Response(JSON.stringify({data: newOrder}), {status:201});
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: "Error ao criar pedido"}), {status: 500})
    }
}