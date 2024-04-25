import {EmailService} from "./interfaces/email.service";
import {EmailRepository} from "./interfaces/email.repository";
import sgMail from "@sendgrid/mail";
import {Email} from "./type/email.type";
import {RetryLimitReached} from "../error/retry.limit.reached";


export class SendGridService implements EmailService{

    emailRepository: EmailRepository;
    amountOfTries:number

    constructor(emailRepository: EmailRepository, amountOfTries:number) {
        this.emailRepository = emailRepository
        this.amountOfTries = amountOfTries
        sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)
    }

    async sendEmail(senderEmail:string, senderId:number, forwardEmail:string, subject:string, body:string): Promise<boolean> {
            for (let i = 0; i < this.amountOfTries; i++) {
                try {
                    const emailType: Email = {
                        to: forwardEmail,
                        from: senderEmail,
                        subject: subject,
                        text: body
                    }
                    await sgMail.send(emailType)
                    await this.emailRepository.register(senderId, forwardEmail, subject, body)
                    return true
                } catch (error) {
                }
            }
            throw new RetryLimitReached()
    }
}