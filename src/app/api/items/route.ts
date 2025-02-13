import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(){

}

export async function POST(request:Request) {
    try {
        const data = await request.json()
        const { id, price, quantity } = data;
        const newOrderItem = await prisma.orderItem.create({
            data:{
                id,
                quantity,
                price
            }
        })
        return new Response(JSON.stringify({data: newOrderItem}), {status:201});
    } catch (error) {
        return new Response(JSON.stringify({error: "Error ao criar item"}), {status: 500});
    }
}