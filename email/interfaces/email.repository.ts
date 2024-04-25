import {Email} from "@prisma/client";


export interface EmailRepository{



    register(senderId:number, forwardEmail:string, subject:string, body:string):Promise<Email | undefined>

    getMailsFromAUserInDay(senderId:number):Promise<number>


}