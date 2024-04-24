import {EmailService} from "./interfaces/email.service";
import {EmailRepository} from "./interfaces/email.repository";
import { NodeMailgun } from 'ts-mailgun';
import {EmailLimit} from "../error/email.limit";
import {checkEmailLimit} from "../utils/check.email.limit";
import {checkMissingFields} from "../utils/check.missing.fields";
import {RetryLimitReached} from "../error/retry.limit.reached";


export class MailgunService implements EmailService{
    emailRepository: EmailRepository;
    mailer: NodeMailgun
    amountOfTries:number

    constructor(emailRepository: EmailRepository, amountOfTries: number) {
        this.mailer = new NodeMailgun();
        this.mailer.apiKey = process.env.MAILGUN_API_KEY as string
        this.emailRepository = emailRepository
        this.amountOfTries = amountOfTries
    }



    async sendEmail(senderEmail:string, senderId:number, forwardEmail:string, subject:string, body:string): Promise<boolean> {
        if (await checkMissingFields([senderEmail, senderId as unknown as string, forwardEmail])) {
            this.mailer.domain = process.env.MAILGUN_MAILER_DOMAIN as string
            this.mailer.fromEmail = senderEmail;
            this.mailer.fromTitle = senderEmail;
            this.mailer.init()

            for (let i = 0; i < this.amountOfTries; i++) {
                try {
                    console.log("mailgun")
                    await this.mailer.send(senderEmail, subject, body)
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