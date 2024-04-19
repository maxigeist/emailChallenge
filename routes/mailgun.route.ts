import {Router} from "express";
import {EmailController} from "../email/email.controller";
import {SendGridService} from "../email/sendgrid.service";
import {EmailRepository} from "../email/email.repository";
import {authenticateToken} from "../token/token";
import {MailgunService} from "../email/mailgun.service";


export const mailgunRouter = Router()

const emailRepository = new EmailRepository()
const mailgunService = new MailgunService(emailRepository)
const mailgunController = new EmailController(mailgunService)

mailgunRouter.post("/send", authenticateToken, async (req, res) => {
    return mailgunController.send(req, res)
})

