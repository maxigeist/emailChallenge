import {UserController} from "./interfaces/user.controller";
import {UserService} from "./interfaces/user.service";
import {Request, Response} from "express";
import {generateToken} from "../token/token";
import {returnRes} from "../error/handler/error.handler";


export class UserControllerImpl implements UserController {

    userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService
    }

    async login(req: Request, res: Response) {
        try {
            const {email, password} = req.body
            const user = await this.userService.login(email, password)
            if (user) {
                const token = generateToken(user.id, user.email, user.password)
                res.status(200).json({status: 200, success: true, message: "Successful login", token: token});
            }
        } catch (error) {
            returnRes(error, res)
        }
    }

    async register(req: Request, res: Response) {
        try {
            const {email, name, password} = req.body
            await this.userService.register(name, email, password);
            res.status(200).json(
                {
                    status: 200,
                    success: true,
                    message: "The user was registered correctly",
                }
            );
        } catch (error) {
            returnRes(error, res)
        }

    }
}
