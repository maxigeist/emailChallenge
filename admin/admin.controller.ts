import {AdminController} from "./interfaces/admin.controller";
import {AdminService} from "./interfaces/admin.service";
import {Request, Response} from "express";
import {AdminNotExists} from "../error/admin.not.exists";
import {decodeUserToken} from "../token/token";


export class AdminControllerImpl implements AdminController {

    adminService: AdminService;

    constructor(adminService: AdminService) {
        this.adminService = adminService
    }

    async getAdmin(req: Request, res: Response) {
        try {
            const {email, password} = req.body
            const admin = await this.adminService.getAdmin(email, password)
            res.status(200).send("Correct admin")
        } catch (error) {
            if (error instanceof AdminNotExists) {
                res.status(401).send(error.message)
            } else {
                res.status(500).send("Internal server error");
            }
        }
    }

    async getStats(req: Request, res: Response) {
        const usersWithMailAmount = await this.adminService.getStats()
        res.status(200).json({
            status: 200,
            success: true,
            message: "Got the users with mail amount success",
            data: usersWithMailAmount
        })

        // const authHeader = req.headers['authorization']
        // const token = authHeader && authHeader.split(' ')[1]//take out bearer
        // const tokenUnwrap = decodeUserToken(token as string)
        //
        // try{
        //     await this.adminService.getAdmin(tokenUnwrap.email, tokenUnwrap.password)
        //
        // }
        // catch (error){
        //     if (error instanceof AdminNotExists){
        //         res.status(401).send(error.message)
        //     } else {
        //         res.status(500).send("Internal server error");
        //     }
        // }
    }


}