import {EmailService} from "./email.service";
import {Request, Response} from "express";


export interface EmailController{

    emailService: EmailService

    send(req:Request, res:Response):any

}