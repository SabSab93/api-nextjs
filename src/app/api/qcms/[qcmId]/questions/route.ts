import { NextRequest, NextResponse } from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()


export const POST = async (request: NextRequest)=> {
    const body = await request.json();
    const newQuestion =await prisma.question.create({
        data: {
                content: body.data.content,
                qcmId: body.data.qcmId,
            }
        })
        return NextResponse.json({message:`une question inserée ${newQuestion.content}`})
};







