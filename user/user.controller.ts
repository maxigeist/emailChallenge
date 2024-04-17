import { UserController } from "./interfaces/user.controller";
import { UserService } from "./interfaces/user.service";
import { Request, Response } from "express";
import { UserServiceImpl } from "./user.service";
import { UserRepositoryImpl } from "./user.repository";
import { EmailExistsError } from "../error/email.exists";
import { JsonWebTokenError, Jwt } from "jsonwebtoken";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import jwt from 'jsonwebtoken'
import { NotValidCredentials } from "../error/not.valid.credentials";

export class UserControllerImpl implements UserController{
    
    userService: UserService;
    
    constructor(userService:UserService){
        this.userService = userService
    }

    async login(req: Request, res: Response) {
        try{
            const {email, password} = req.body
            const user = await this.userService.login(email, password)
            const token = jwt.sign({ _id: user?.id, email: user?.email },"YOUR_SECRET",{expiresIn: "1d",});
            res.status(200).json({status: 200, success: true,message: "login success",token: token});
        }
        catch(error){
            if (error instanceof NotValidCredentials){
                res.status(401).send(error.message)
            }
            else{
                res.status(500).send("Internal server error");
            }
        }
    }

    async register(req:Request, res:Response){
        try {
            const {email, name, password} = req.body
            const response = await this.userService.register(name, email, password);
            res.send(response);
        } catch (error) {
            if (error instanceof EmailExistsError){
                res.status(403).send(error.message)
            }
            else{
                res.status(500).send("Internal server error");
            }
        }

    }

}
