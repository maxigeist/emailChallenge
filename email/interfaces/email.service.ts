import {EmailRepository} from "./email.repository";




export interface EmailService{

    emailRepository:EmailRepository


    sendEmail(senderEmail:string,forwardEmail:string, subject:string, body:string):Promise<boolean>

}