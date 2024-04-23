import {Router} from "express";
import {EmailControllerImpl} from "../email/email.controller";
import {SendGridService} from "../email/sendgrid.service";
import {EmailRepositoryImpl} from "../email/email.repository";
import {authenticateToken} from "../token/token";
import {MailgunService} from "../email/mailgun.service";


export const mailgunRouter = Router()

const emailRepository = new EmailRepositoryImpl()
const mailgunService = new MailgunService(emailRepository)
const mailgunController = new EmailControllerImpl(mailgunService)

mailgunRouter.post("/send", authenticateToken, async (req, res) => {
    return mailgunController.send(req, res)
})

