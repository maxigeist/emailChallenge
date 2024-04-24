import {EmailService} from "./interfaces/email.service";
import {EmailRepository} from "./interfaces/email.repository";
import sgMail, {send} from "@sendgrid/mail";
import {Email} from "./type/email.type";
import {checkEmailLimit} from "../utils/check.email.limit";
import {Retry} from "./interfaces/retry";
import * as console from "node:console";
import {RetryLimitReached} from "../error/retry.limit.reached";
import {checkMissingFields} from "../utils/check.missing.fields";


export class SendGridService implements EmailService{

    emailRepository: EmailRepository;
    amountOfTries:number

    constructor(emailRepository: EmailRepository, amountOfTries:number) {
        this.emailRepository = emailRepository
        this.amountOfTries = amountOfTries
        sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)
    }



    async sendEmail(senderEmail:string, senderId:number, forwardEmail:string, subject:string, body:string): Promise<boolean> {
        if (await checkMissingFields([senderEmail, senderId as unknown as string, forwardEmail])) {

            await checkEmailLimit(this.emailRepository, senderId)

            for (let i = 0; i < this.amountOfTries; i++) {
                try {
                    const emailType: Email = {
                        to: forwardEmail,
                        from: senderEmail,
                        subject: subject,
                        text: body
                    }
                    await sgMail.send(emailType)
                    console.log("sendgrid")
                    await this.emailRepository.register(senderId, forwardEmail, subject, body)
                    return true
                } catch (error) {
                    console.error(error)
                }
            }
            throw new RetryLimitReached()

        }
        return false
    }

}