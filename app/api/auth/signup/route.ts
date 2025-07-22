import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req:NextRequest) {
    const { name , email , password } = await req.json();

    if(!name || !email || !password) {
        return new NextResponse("Missing Fields", { status: 400 });
    }

    const hashed = await bcrypt.hash(password,10);

    const newUser = await prisma.user.create({
        data:{
            name,
            email,
            password:hashed
        }
    });

    return NextResponse.json({
        message:"New user created successfully", newUser
    })
}