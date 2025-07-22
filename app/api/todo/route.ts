import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma = new PrismaClient();

export async function  POST(req:NextRequest) {
    const session = await getServerSession(authOptions);

    if(!session?.user?.email) {
        return NextResponse.json(
            {error : "Unauthorized"},
            { status : 401 }
        )
    }

    const { title } = await req.json();

    if(!title) {
        return NextResponse.json(
            { error: "Title is required"},
            { status : 400 }
        )
    }

    // check user exist and store todo for the same user in db
    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    });

    const todo = await prisma.todo.create({
        data:{title,
        userId:user.id,
        completed:false
        }
    })

    return NextResponse.json(todo);
}

export async function GET() {
    const session = await getServerSession(authOptions);
    if(!session) {
        return NextResponse.json({
            error:"Unauthorised"
        } , { status : 401 });
    }

    const todos = await prisma.todo.findMany({
        where:{user:{email:session.user.email!}},
        orderBy:{ createdAt : "desc"}
    })

    return NextResponse.json(todos);
}