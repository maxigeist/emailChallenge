import {EmailController} from "./interfaces/email.controller";
import {EmailService} from "./interfaces/email.service";
import e from "express";
import {decodeUserToken} from "../token/token";


export class EmailControllerImpl implements EmailController{

    emailService: EmailService;

    constructor(emailService: EmailService) {
        this.emailService = emailService
    }


    async send(req: e.Request, res: e.Response) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]//take out bearer
        const tokenUnwrap = decodeUserToken(token as string)

        try{
            const {forwardEmail, subject, body} = req.body
            const result = await this.emailService.sendEmail(tokenUnwrap.email, parseInt(tokenUnwrap._id),  forwardEmail, subject, body)
            res.status(200).send("The email was sent correctly")
            }
        catch (error){
            res.status(400).send("Something went wrong")
        }

    }




}