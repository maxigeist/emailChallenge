import {Router} from "express";
import {EmailControllerImpl} from "../email/email.controller";
import {SendGridService} from "../email/sendgrid.service";
import {EmailRepositoryImpl} from "../email/email.repository";
import {authenticateToken} from "../token/token";
import prismaDb from "../db/db";


export const sendgridRouter = Router()

const sendGridRepository = new EmailRepositoryImpl(prismaDb)
const sendGridService = new SendGridService(sendGridRepository, 10)
const sendGridController = new EmailControllerImpl(sendGridService)

sendgridRouter.post("/send", authenticateToken, async (req, res) => {
    return sendGridController.send(req, res)
})

