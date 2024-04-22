import {EmailRepository} from "./interfaces/email.repository";
import {prisma} from "../db/db";
import {Email} from "@prisma/client";


export class EmailRepositoryImpl implements EmailRepository {


    async register(senderId: number, forwardEmail: string, subject: string, body: string): Promise<string | undefined> {
        const email = await prisma.email.create({
            data: {
                userId: senderId,
                receiver: forwardEmail,
                subject: subject,
                data: body
            }
        })
        return email.receiver
    }


    async getMailsFromAUserInDay(senderId: number):Promise<number> {
        const date = new Date()
        const emailByUserInDay = await prisma.email.count({
            where: {
                date:{
                    gte: date,
                    lte: date
                },
                userId:senderId
            }

        })
        return emailByUserInDay
    }


}