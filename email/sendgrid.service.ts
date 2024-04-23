import {EmailService} from "./interfaces/email.service";
import {EmailRepository} from "./interfaces/email.repository";
import sgMail, {send} from "@sendgrid/mail";
import {Email} from "./type/email.type";
import {EmailLimit} from "../error/email.limit";
import {checkEmailLimit} from "../utils/check.email.limit";
import {Retry} from "./interfaces/retry";
import * as console from "node:console";


export class SendGridService implements EmailService, Retry{

    emailRepository: EmailRepository;
    constructor(emailRepository: EmailRepository) {
        this.emailRepository = emailRepository
    }



    async sendEmail(senderEmail:string, senderId:number, forwardEmail:string, subject:string, body:string): Promise<boolean> {
        await checkEmailLimit(this.emailRepository, senderId)
        const email:Email = {
            to:forwardEmail,
            from: senderEmail,
            subject:subject,
            text:body
        }
        for (let i = 0; i < this.getAmountOfRetries(); i++) {
            try{
                // sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)
                // sgMail.send(email).then((response) => {
                //     console.log(response[0].statusCode)
                //         console.log(response[0].headers)
                //         return true
                //     })
                const email = await this.emailRepository.register(senderId, forwardEmail, subject, body)
                console.log(email)
                return true
            }
            catch (error){
                console.error(error)
            }
        }
        throw Error

        }


    getAmountOfRetries(): number {
        return 1;
    }
}