import {Admin} from "@prisma/client";
import {AdminRepository} from "./admin.repository";
import {UserMailAmount} from "../admin.service";


export interface AdminService{

    adminRepository: AdminRepository


    getAdmin(email:string, password:string):Promise<Admin | undefined>

    getStats():Promise<UserMailAmount[]>

}