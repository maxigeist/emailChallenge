import {AdminService} from "./admin.service";
import {Request, Response} from "express";

export interface AdminController{

    adminService: AdminService

    getAdmin(req:Request, res:Response):any

}