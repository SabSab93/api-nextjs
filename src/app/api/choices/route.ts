import { NextRequest, NextResponse } from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()




export const POST = async (request: NextRequest)=> {
    const body = await request.json();
    const newChoice =await prisma.choice.create({
        data: {
            response:body.data.response,
            isCorrect: body.data.isCorrect,
            questionId: body.data.questionId
        }
    })
    return NextResponse.json({message:`un choix inseré ${newChoice.response}`})
};




export const GET =async ()=> {
    const choices = await prisma.choice.findMany({})
    return NextResponse.json({choices});
}

