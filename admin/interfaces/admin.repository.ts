import {Admin} from "@prisma/client";
import { Prisma } from '@prisma/client'


type UserWithPosts = Prisma.UserGetPayload<{
    include: {
        emails: {
            select: {
                id: true
            }
        }
    }
}>

export interface AdminRepository{


    getAdmin(email:string, password:string): Promise<Admin | undefined>


    getUserMailsByDate(date:Date, email?:string):Promise<UserWithPosts[]>

}