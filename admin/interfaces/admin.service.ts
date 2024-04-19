import {Admin, Email} from "@prisma/client";
import {AdminRepository} from "./admin.repository";
import {UserMailAmount} from "../admin.service";


export interface AdminService{

    adminRepository: AdminRepository


    getAdmin(email:string, password:string):Promise<Admin | undefined>

    getStats(date:Date, email:string):Promise<UserMailAmount[]>

}