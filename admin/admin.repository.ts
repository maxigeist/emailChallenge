import {AdminRepository} from "./interfaces/admin.repository";
import {Admin, Prisma} from "@prisma/client";
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
        return []
    }

    async getUserMailsByDate(date:Date, email?:string){

        return prisma.user.findMany({

            where:{
                email: email
            },
            include:{
                emails:{
                    where:{
                        date: {
                            //This sets a starting and an ending point for the mails
                            gte: date,
                            lte: date,
                        }
                    }
                }
            }
        });

    }


}