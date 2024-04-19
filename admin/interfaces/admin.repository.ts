import {Admin, Email, User} from "@prisma/client";
import { Prisma } from '@prisma/client'


type UserWithPosts = Prisma.UserGetPayload<{
    include: { emails: true }
}>

export interface AdminRepository{


    getAdmin(email:string, password:string): Promise<Admin | undefined>

    getAllUsers():Promise<User[]>

    getUserMailsByDate(date:Date, email:string):Promise<UserWithPosts[]>

}