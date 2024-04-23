import {AdminController} from "./interfaces/admin.controller";
import {AdminService} from "./interfaces/admin.service";
import {Request, Response} from "express";
import {decodeUserToken} from "../token/token";
import {returnRes} from "../error/handler/error.handler";


export class AdminControllerImpl implements AdminController {

    adminService: AdminService;

    constructor(adminService: AdminService) {
        this.adminService = adminService
    }

    async getAdmin(req: Request, res: Response) {
        try {
            const {email, password} = req.body
            const admin = await this.adminService.getAdmin(email, password)
            res.status(200).json(
                {
                    status:200,
                    success:true,
                    message: "The credentials for this admin are correct"
                })
        } catch (error) {
            returnRes(error, res)
        }
    }

    async getStats(req: Request, res: Response) {
        try{
            const tokenUnwrap = decodeUserToken(req.headers['authorization'])
            const {date, email} = req.body
            //This call is to check if this credentials are valid for an admin, if we can find a record in admin that matches this
            await this.adminService.getAdmin(tokenUnwrap.email, tokenUnwrap.password)
            const usersWithMailAmount = await this.adminService.getStats(date, email)
            res.status(200).json({
                status: 200,
                success: true,
                message: "Got the users with their mail amount for the day",
                data: usersWithMailAmount
            })
        }catch (error){
            returnRes(error, res)
        }
    }



}