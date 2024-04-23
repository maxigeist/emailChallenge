import { PrismaClient } from '@prisma/client';

const { NODE_ENV } = process.env;

let prismaDb:PrismaClient;

if (NODE_ENV === 'production') {
    prismaDb = new PrismaClient();
} else {
    prismaDb = new PrismaClient();
}

export default prismaDb;


