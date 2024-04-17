import { UserService } from "./user.service"
import { Request, Response } from "express";

export interface UserController{
    userService : UserService

    register(req:Request, res:Response):any

    login (req:Request, res:Response):any

}