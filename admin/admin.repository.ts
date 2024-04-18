import {AdminRepository} from "./interfaces/admin.repository";
import {Admin} from "@prisma/client";
import { prisma } from "../db/db";


export class AdminRepositoryImpl implements AdminRepository{



    async getAdmin(email:string, password:string): Promise<Admin | undefined> {
        const admin  = await prisma.admin.findFirst({
            where:{
                email:email,
                password:password
            }
        })
        return admin ? admin : undefined;
    }

    async getAllUsers(){
        return prisma.user.findMany();
    }

    async getUserMails(email:string){
        return prisma.email.findMany({
            where:{
                sender:email,
            }
            }
        );
    }


}