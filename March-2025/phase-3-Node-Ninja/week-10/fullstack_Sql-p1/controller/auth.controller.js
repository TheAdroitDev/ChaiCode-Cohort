import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
    console.log('user registered!');
    await prisma.user.findUnique({
        where: { email }
    })
}