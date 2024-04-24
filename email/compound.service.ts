import {EmailService} from "./interfaces/email.service";
import {EmailRepository} from "./interfaces/email.repository";
import {EmailLimit} from "../error/email.limit";
import {checkEmailLimit} from "../utils/check.email.limit";
import {EmailServicesDown} from "../error/email.services.down";


export class CompoundService implements EmailService {

    emailRepository: EmailRepository;
    emailServices: EmailService[]

    constructor(emailRepository: EmailRepository, emailServices: EmailService[]) {
        this.emailRepository = emailRepository
        this.emailServices = emailServices
    }

    async sendEmail(senderEmail: string, senderId: number, forwardEmail: string, subject: string, body: string): Promise<boolean> {
        await checkEmailLimit(this.emailRepository, senderId)
        for (const emailService of this.emailServices) {
            try {
                const resultOfSentEmail = await emailService.sendEmail(senderEmail, senderId, forwardEmail, subject, body)
                if (resultOfSentEmail) {
                    return true
                }
            }catch (error){
                console.error(error)
            }
        }
        throw new EmailServicesDown()
    }
}