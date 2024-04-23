import {EmailService} from "./interfaces/email.service";
import {EmailRepository} from "./interfaces/email.repository";
import sgMail, {send} from "@sendgrid/mail";
import {Email} from "./type/email.type";


export class SendGridService implements EmailService{
    emailRepository: EmailRepository;
    emailLimit:number
    constructor(emailRepository: EmailRepository, emailLimit:number) {
        this.emailLimit = emailLimit
        this.emailRepository = emailRepository
    }



    async sendEmail(senderEmail:string, senderId:number, forwardEmail:string, subject:string, body:string): Promise<boolean> {
        const emailCount = await this.emailRepository.getMailsFromAUserInDay(senderId)
        console.log(emailCount)
        if(emailCount > this.emailLimit){
            return false
        }
        const email:Email = {
            to:forwardEmail,
            from: senderEmail,
            subject:subject,
            text:body
        }
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
                return false

            }
        }
}