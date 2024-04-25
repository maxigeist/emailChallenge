import {Router} from "express";
import {EmailControllerImpl} from "../email/email.controller";
import {EmailRepositoryImpl} from "../email/email.repository";
import {authenticateToken} from "../token/token";
import {MailgunService} from "../email/mailgun.service";
import prismaDb from "../db/db";


export const mailgunRouter = Router()

const emailRepository = new EmailRepositoryImpl(prismaDb)
const mailgunService = new MailgunService(emailRepository, 2)
const mailgunController = new EmailControllerImpl(mailgunService)

mailgunRouter.post("/send", authenticateToken, async (req, res) => {
    return mailgunController.send(req, res)
})

