import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const PUT = async (
    request: NextRequest,
    { params }: { params: { qcmid: string } }
): Promise<NextResponse> => {
    const choiceId = parseInt(params.qcmid, 10);
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


export const GET = async (request: NextRequest, 
    {
    params: {qcmid}
    }: {params: {qcmid:string} } 
) => {
    return NextResponse.json({message: {qcmid}}, {status:210});
};

