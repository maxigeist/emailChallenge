import {EmailService} from "./interfaces/email.service";
import {EmailRepository} from "./interfaces/email.repository";
import { NodeMailgun } from 'ts-mailgun';
import {EmailLimit} from "../error/email.limit";
import {checkEmailLimit} from "../utils/check.email.limit";


export class MailgunService implements EmailService{
    emailRepository: EmailRepository;
    mailer: NodeMailgun

    constructor(emailRepository: EmailRepository) {
        this.mailer = new NodeMailgun();
        this.mailer.apiKey = process.env.MAILGUN_API_KEY as string
        this.emailRepository = emailRepository
    }



    async sendEmail(senderEmail:string, senderId:number, forwardEmail:string, subject:string, body:string): Promise<boolean> {
        await checkEmailLimit(this.emailRepository, senderId)
        this.mailer.domain = process.env.MAILGUN_MAILER_DOMAIN as string
        this.mailer.fromEmail = senderEmail;
        this.mailer.fromTitle = senderEmail;
        this.mailer.init()
        try{
            await this.mailer.send(senderEmail,subject, body )
            await this.emailRepository.register(senderId, forwardEmail, subject, body)
            return true
        }
        catch (error){
            console.log(error)
            console.error(error)
            return false
        }
    }
}