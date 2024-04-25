import {Router} from "express";
import {EmailControllerImpl} from "../email/email.controller";
import {SendGridService} from "../email/sendgrid.service";
import {EmailRepositoryImpl} from "../email/email.repository";
import {authenticateToken} from "../token/token";
import prismaDb from "../db/db";
import {CompoundService} from "../email/compound.service";
import {MailgunService} from "../email/mailgun.service";


export const compoundMailRouter = Router()

const emailRepository = new EmailRepositoryImpl(prismaDb)
const sendGridService = new SendGridService(emailRepository, 2)
const mailgunService = new MailgunService(emailRepository, 2)
const compoundMailService = new CompoundService(emailRepository, [sendGridService, mailgunService])
const compoundController = new EmailControllerImpl(compoundMailService)

compoundMailRouter.post("/send", authenticateToken, async (req, res) => {
    return compoundController.send(req, res)
})

