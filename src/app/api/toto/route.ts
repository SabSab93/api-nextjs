import { NextRequest, NextResponse } from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

// export const GET =async ()=> {
//     const users = await prisma.user.findMany({})
//     return NextResponse.json({message:"Hello World !",users:users});
// }


// // export const GET = async (req: NextRequest)=> {
// //     return NextResponse.json({message:"Hello World !"})
// // };

// export const POST = async (request: NextRequest)=> {
//     const body = await request.json();
//     const newUser =await prisma.user.create({
//         data: {
//             email:body.data.name + "@gmail.com",
//             name: body.data.name
//         }
//     })
//     return NextResponse.json({message:`Hello ${body.data.name}` , user: newUser })
// };


// export const POST = async (request: NextRequest)=> {
//     const body = await request.json();
//     const name = body.name;
//     // ou bien en simplifiant const {name}= body;
//     // ou en plus simplifier sup la ligne 8 et 9 directement const {name} = await request.json();
//     return NextResponse.json({message:`Hello, ${name} !`})
// };




