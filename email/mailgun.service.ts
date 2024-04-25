import {EmailService} from "./interfaces/email.service";
import {EmailRepository} from "./interfaces/email.repository";
import { NodeMailgun } from 'ts-mailgun';
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
            this.mailer.domain = process.env.MAILGUN_MAILER_DOMAIN as string
            this.mailer.fromEmail = senderEmail;
            this.mailer.fromTitle = senderEmail;
            this.mailer.init()
            for (let i = 0; i < this.amountOfTries; i++) {
                try {
                    await this.mailer.send(senderEmail, subject, body)
                    await this.emailRepository.register(senderId, forwardEmail, subject, body)
                    return true
                } catch (error) {
                }
            }
            throw new RetryLimitReached()

    }
}