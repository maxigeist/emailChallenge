import {EmailService} from "./interfaces/email.service";
import {EmailRepository} from "./interfaces/email.repository";
import sgMail from "@sendgrid/mail";
import {Email} from "./type/email.type";


export class SendGridService implements EmailService{
    emailRepository: EmailRepository;

    constructor(emailRepository: EmailRepository) {
        this.emailRepository = emailRepository
    }



    async sendEmail(senderEmail:string, senderId:number, forwardEmail:string, subject:string, body:string): Promise<boolean> {
        const email:Email = {
            to:forwardEmail,
            from: senderEmail,
            subject:subject,
            text:body
        }
        try{
            sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)
            sgMail.send(email).then((response) => {
                console.log(response[0].statusCode)
                    console.log(response[0].headers)
                    return true
                })
            await this.emailRepository.register(senderId, forwardEmail, subject, body)
            return true
            }
            catch (error){
                console.error(error)
                return false

            }
        }
}