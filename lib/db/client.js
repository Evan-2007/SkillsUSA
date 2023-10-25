import { PrismaClient } from "@prisma/client";

export const prisma = 
    global.prisma ||
    new PrismaClient({
        log: ["query", "info", "warn"],
    });

if (process.env.NODE_ENV === "development") global.prisma = prisma;