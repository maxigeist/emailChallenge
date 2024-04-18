import {Router} from "express";
import {SendGridController} from "../email/sendgrid.controller";
import {SendGridService} from "../email/sendgrid.service";
import {SendGridRepository} from "../email/sendgrid.repository";
import {authenticateToken} from "../token/token";


export const sendgridRouter = Router()

const sendGridRepository = new SendGridRepository()
const sendGridService = new SendGridService(sendGridRepository)
const sendGridController = new SendGridController(sendGridService)

sendgridRouter.post("/send", authenticateToken, async (req, res) => {
    return sendGridController.send(req, res)
})

