import {EmailRepository} from "./interfaces/email.repository";
import { prisma } from "../db/db";


export class SendGridRepository implements EmailRepository{


    async register(senderEmail: string, forwardEmail: string, subject: string, body: string): Promise<string | undefined> {
           const email = await prisma.email.create({
               data:{
                   sender:senderEmail,
                   receiver:forwardEmail,
                   subject:subject,
                   data:body
               }
           })
        return email.sender

    }




}