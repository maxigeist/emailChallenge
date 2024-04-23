import {EmailRepository} from "./interfaces/email.repository";
import {Email, PrismaClient} from "@prisma/client";



export class EmailRepositoryImpl implements EmailRepository {
    prismaClient:PrismaClient

    constructor(prismaClient:PrismaClient) {
        this.prismaClient = prismaClient
    }


    async register(senderId: number, forwardEmail: string, subject: string, body: string): Promise<Email | undefined> {
        const email = await this.prismaClient.email.create({
            data: {
                userId: senderId,
                receiver: forwardEmail,
                subject: subject,
                data: body
            }
        })
        return email ? email : undefined
    }


    async getMailsFromAUserInDay(senderId: number):Promise<number> {
        const date = new Date()
        return this.prismaClient.email.count({
            where: {
                date: {
                    gte: date,
                    lte: date
                },
                userId: senderId
            }
        })
    }

    async getAllMails():Promise<Email[]>{
        return this.prismaClient.email.findMany()
    }


}