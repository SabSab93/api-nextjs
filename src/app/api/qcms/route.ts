import { NextRequest, NextResponse } from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()



export const POST = async (request: NextRequest)=> {
    const body = await request.json();
    const newQcm =await prisma.qcm.create({
        data: {
            title:body.data.title
        }
    })
    return NextResponse.json({message:`nouveau QMC numero : ${newQcm.id}, titre: ${newQcm.title}` })
};


export const GET =async ()=> {
    const qcm = await prisma.qcm.findMany({})
    return NextResponse.json({qcm});
}

