import {Router} from "express";
import {EmailController} from "../email/email.controller";
import {SendGridService} from "../email/sendgrid.service";
import {EmailRepository} from "../email/email.repository";
import {authenticateToken} from "../token/token";


export const sendgridRouter = Router()

const sendGridRepository = new EmailRepository()
const sendGridService = new SendGridService(sendGridRepository)
const sendGridController = new EmailController(sendGridService)

sendgridRouter.post("/send", authenticateToken, async (req, res) => {
    return sendGridController.send(req, res)
})

