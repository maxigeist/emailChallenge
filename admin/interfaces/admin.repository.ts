import {Admin, Email, User} from "@prisma/client";


export interface AdminRepository{


    getAdmin(email:string, password:string): Promise<Admin | undefined>

    getAllUsers():Promise<User[]>

    getUserMails(email:string):Promise<Email[]>

}