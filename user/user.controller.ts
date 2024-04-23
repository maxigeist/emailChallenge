import { UserController } from "./interfaces/user.controller";
import { UserService } from "./interfaces/user.service";
import {Request, Response} from "express";
import { EmailExistsError } from "../error/email.exists";
import { NotValidCredentials } from "../error/not.valid.credentials";
import {generateToken} from "../token/token";
import {ExtendedError} from "../error/interface/extended.error";


export class UserControllerImpl implements UserController{
    
    userService: UserService;
    commonError: ExtendedError
    
    constructor(userService:UserService, commonError:ExtendedError){
        this.userService = userService
        this.commonError = commonError
    }

    async login(req: Request, res: Response) {
        try{
            const {email, password} = req.body
            const user = await this.userService.login(email, password)
            if (user){
                const token = generateToken(user.id, user.email, user.password)
                res.status(200).json({status: 200, success: true,message: "login success",token: token});
            }
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
                res.status(error.getStatus()).json(error.getAsJson())
            }
            else{
                res.status(this.commonError.getStatus()).json(this.commonError.getAsJson());
            }
        }

    }
}
