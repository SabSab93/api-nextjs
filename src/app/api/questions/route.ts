import { NextRequest, NextResponse } from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()


export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const body = await request.json();
        const newQuestion = await prisma.question.create({
            data: {
                content: body.data.content,
                qcmId: body.data.qcmId,
            },
        });
        return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
    }
};



export const GET =async ()=> {
    const question = await prisma.qcm.findMany({})
    return NextResponse.json({question});
}