import {EmailRepository} from "./interfaces/email.repository";
import { prisma } from "../db/db";


export class EmailRepository implements EmailRepository{


    async register(senderId: number, forwardEmail: string, subject: string, body: string): Promise<string | undefined> {
           const email = await prisma.email.create({
               data:{
                   userId: senderId,
                   receiver:forwardEmail,
                   subject:subject,
                   data:body
               }
           })
        return email.receiver

    }




}