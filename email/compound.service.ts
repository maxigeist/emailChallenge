import {EmailService} from "./interfaces/email.service";
import {EmailRepository} from "./interfaces/email.repository";
import {checkEmailLimit} from "../utils/check.email.limit";
import {EmailServicesDown} from "../error/email.services.down";
import {checkMissingFields} from "../utils/check.missing.fields";


export class CompoundService implements EmailService {

    emailRepository: EmailRepository;
    emailServices: EmailService[]

    constructor(emailRepository: EmailRepository, emailServices: EmailService[]) {
        this.emailRepository = emailRepository
        this.emailServices = emailServices
    }

    async sendEmail(senderEmail: string, senderId: number, forwardEmail: string, subject: string, body: string): Promise<boolean> {
        if (await checkMissingFields([senderEmail, senderId as unknown as string, forwardEmail])) {
            await checkEmailLimit(this.emailRepository, senderId)
            for (const emailService of this.emailServices) {
                try {
                    const resultOfSentEmail = await emailService.sendEmail(senderEmail, senderId, forwardEmail, subject, body)
                    if (resultOfSentEmail) {
                        return true
                    }
                } catch (error) {
                }
            }
            throw new EmailServicesDown()
        }
        return false
    }

}