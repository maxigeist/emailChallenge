import {AdminService} from "./interfaces/admin.service";
import {Admin, Email, User} from "@prisma/client";
import {AdminRepository} from "./interfaces/admin.repository";
import {AdminNotExists} from "../error/admin.not.exists";



export type UserMailAmount = {
    email:string,
    mailAmount:number
}


export class AdminServiceImpl implements AdminService{
    adminRepository: AdminRepository;

    constructor(adminRepository:AdminRepository) {
        this.adminRepository = adminRepository
    }


    async getAdmin(email: string, password: string): Promise<Admin | undefined> {
        const admin = await this.adminRepository.getAdmin(email, password)
        if(admin == undefined){
            throw new AdminNotExists()
        }
        else {
            return admin
        }
    }

    async getStats(date:Date, email:string):Promise<UserMailAmount[]>{
        const userMailAmounts:UserMailAmount[] = []
        const usersWithPosts = await this.adminRepository.getUserMailsByDate(date ? new Date(date): new Date(), email)
        for (const user of usersWithPosts) {
            userMailAmounts.push({email: user.email, mailAmount: user.emails.length})
        }
        return userMailAmounts

    }






}