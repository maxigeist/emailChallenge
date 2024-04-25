import {EmailController} from "./interfaces/email.controller";
import {EmailService} from "./interfaces/email.service";
import e from "express";
import {decodeUserToken} from "../token/token";
import {returnRes} from "../error/handler/error.handler";


export class EmailControllerImpl implements EmailController{

    emailService: EmailService;

    constructor(emailService: EmailService) {
        this.emailService = emailService
    }


    async send(req: e.Request, res: e.Response) {
        const tokenUnwrap = decodeUserToken(req.headers['authorization'])

        try{
            const {forwardEmail, subject, body} = req.body
            await this.emailService.sendEmail(tokenUnwrap.email, parseInt(tokenUnwrap._id),  forwardEmail, subject, body)
            res.status(200).json(
                {
                    status:200,
                    success:true,
                    message: "The email was sent correctly"
                })
            }
        catch (error){
            returnRes(error, res)
        }

    }




}