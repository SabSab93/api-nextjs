import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const PUT = async (
    request: NextRequest,
    {
        params
    }: { params: Promise <{ qcmId: string }> }
): Promise<NextResponse> => {
    const {qcmId} = await params
    const choiceId = parseInt(qcmId, 10);
    const body = await request.json();

    const updatedChoice = await prisma.choice.update({
        where: { id: choiceId },
        data: {
            response: body.data.response,
            isCorrect: body.data.isCorrect,
            questionId: body.data.questionId
        },
    });

    return NextResponse.json(
        { message: `Choice mis à jour : ${updatedChoice.response}`, choice: updatedChoice },
        { status: 200 }
    );
};


export const GET =async ()=> {
    const choice = await prisma.choice.findMany({})
    return NextResponse.json({choice});
}



