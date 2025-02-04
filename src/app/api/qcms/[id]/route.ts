import { NextRequest, NextResponse } from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export const GET = async (
    request: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse> => {
    try {
        const qcmId = parseInt(params.id, 10);

        // Vérification si l'ID est un nombre valide
        if (isNaN(qcmId)) {
            return NextResponse.json({ message: "ID invalide" }, { status: 400 });
        }

        // Récupérer le QCM avec l'ID donné
        const qcm = await prisma.qcm.findUnique({
            where: { id: qcmId },
            select: { title: true },
        });

        if (!qcm) {
            return NextResponse.json({ message: `QCM avec l'ID ${qcmId} non trouvé` }, { status: 404 });
        }

        return NextResponse.json(
            { message: `Le titre du QCM numéro ${qcmId} est : ${qcm.title}` },
            { status: 200 }
        );
    } catch (error) {
        console.error("Erreur lors de la récupération du QCM :", error);
        return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
    }
};



export const PUT = async (
    request: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse> => {
    try {
        const qcmId = parseInt(params.id, 10);

        // Vérifier si l'ID est un nombre valide
        if (isNaN(qcmId)) {
            return NextResponse.json({ message: "ID invalide" }, { status: 400 });
        }

        const body = await request.json();

        // Vérifier que le champ "title" est bien envoyé
        if (!body.title || typeof body.title !== "string") {
            return NextResponse.json(
                { message: "Le champ 'title' est requis et doit être une chaîne de caractères" },
                { status: 400 }
            );
        }

        // Vérifier si le QCM existe
        const existingQcm = await prisma.qcm.findUnique({
            where: { id: qcmId },
        });

        if (!existingQcm) {
            return NextResponse.json(
                { message: `QCM avec l'ID ${qcmId} non trouvé` },
                { status: 404 }
            );
        }

        // Mettre à jour le QCM
        const updatedQcm = await prisma.qcm.update({
            where: { id: qcmId },
            data: { title: body.title },
        });

        return NextResponse.json(
            { message: `QCM mis à jour avec succès`, qcm: updatedQcm },
            { status: 200 }
        );
    } catch (error) {
        console.error("❌ Erreur lors de la mise à jour du QCM :", error);
        return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
    }
};