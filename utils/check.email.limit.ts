import {EmailLimit} from "../error/email.limit";
import {EmailRepository} from "../email/interfaces/email.repository";


export async function checkEmailLimit(emailRepository: EmailRepository, senderId:number): Promise<void>{
    const emailCount = await emailRepository.getMailsFromAUserInDay(senderId)
    if(emailCount >= parseInt(process.env.MAIL_LIMIT as string)){
        throw new EmailLimit()
    }
}