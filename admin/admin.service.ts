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
        console.log(admin)
        if(admin == undefined){
            throw new AdminNotExists()
        }
        else {
            return admin
        }
    }

    async getStats():Promise<UserMailAmount[]>{
        const userMailAmounts:UserMailAmount[] = []
        const users = await this.adminRepository.getAllUsers()
        for (const user of users) {
            const emails = await this.adminRepository.getUserMails(user.email)
            let counter = 0
            for (const email of emails){
                if (email.date.getDate() == new Date().getDate()){
                    counter += 1
                }
            }
            userMailAmounts.push({email:user.email, mailAmount:counter})
        }
        console.log(userMailAmounts)
        return userMailAmounts


        // return validEmails.length

        // console.log(users.then((response) => response))
    }






}