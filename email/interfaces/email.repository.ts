import {Email} from "@prisma/client";


export interface EmailRepository{



    register(senderId:number, forwardEmail:string, subject:string, body:string):Promise<string | undefined>

    getMailsFromAUserInDay(senderId:number):Promise<number>


}