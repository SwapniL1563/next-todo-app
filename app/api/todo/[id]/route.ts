import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma  = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const todo = await prisma.todo.findUnique({
    where: {
      id: params.id,
      userId: session.user.id,
    },
  });

  if (!todo) return NextResponse.json({ error: 'Todo not found' }, { status: 404 });

  return NextResponse.json(todo);
}

export async function PUT(req:NextRequest, { params}:{ params : { id : string}}){
    const session = await getServerSession(authOptions);

    if(!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { completed } = await req.json();

    try {
        const updatedTodo = await prisma.todo.update({
            where:{
            id:params.id,
            userId:session.user.id
            },
            data:{
                completed
            }
        });

        return NextResponse.json(updatedTodo);
    } catch (error) {
      return NextResponse.json({ error: 'Todo not found or update failed' }, { status: 400 });

    }
}

export async function DELETE(req:NextRequest, { params}:{ params : { id : string}}){
    const session = await getServerSession(authOptions);

    if(!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        await prisma.todo.delete({
            where:{
                id:params.id,
                userId:session.user.id
            }
        });

        return NextResponse.json({
            message:"Todo deleted successfully!"
        }, { status:200})
    } catch (error) {
       return NextResponse.json({ error: 'Todo not found or delete failed' }, { status: 400 });   
    }
}