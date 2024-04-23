import {EmailService} from "./interfaces/email.service";
import {EmailRepository} from "./interfaces/email.repository";
import sgMail, {send} from "@sendgrid/mail";
import {Email} from "./type/email.type";
import {checkEmailLimit} from "../utils/check.email.limit";
import {Retry} from "./interfaces/retry";
import * as console from "node:console";
import {RetryLimitReached} from "../error/retry.limit.reached";


export class SendGridService implements EmailService{

    emailRepository: EmailRepository;
    amountOfTries:number

    constructor(emailRepository: EmailRepository, amountOfTries:number) {
        this.emailRepository = emailRepository
        this.amountOfTries = amountOfTries
    }



    async sendEmail(senderEmail:string, senderId:number, forwardEmail:string, subject:string, body:string): Promise<boolean> {
        await checkEmailLimit(this.emailRepository, senderId)
        const email:Email = {
            to:forwardEmail,
            from: senderEmail,
            subject:subject,
            text:body
        }
        for (let i = 0; i < this.amountOfTries; i++) {
            try{
                // sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)
                // sgMail.send(email).then((response) => {
                //     console.log(response[0].statusCode)
                //         console.log(response[0].headers)
                //         return true
                //     })
                console.log("sendgrid")
                const email = await this.emailRepository.register(senderId, forwardEmail, subject, body)
                console.log(email)
                return true
            }
            catch (error){
                console.error(error)
            }
        }
        throw new RetryLimitReached()

        }

}