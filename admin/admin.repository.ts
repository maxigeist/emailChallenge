import {AdminRepository} from "./interfaces/admin.repository";
import {Admin, PrismaClient} from "@prisma/client";




export class AdminRepositoryImpl implements AdminRepository {

    prismaClient:PrismaClient

    constructor(prismaClient:PrismaClient) {
        this.prismaClient = prismaClient
    }

    async getAdmin(email: string, password: string): Promise<Admin | undefined> {
        const admin = await this.prismaClient.admin.findFirst({
            where: {
                email: email,
                password: password
            }
        })
        return admin ? admin : undefined;
    }


    async getUserMailsByDate(date: Date, email?: string) {
        return this.prismaClient.user.findMany({

            where: {
                email: email
            },
            include: {
                emails: {
                    where: {
                        date: {
                            //This sets a starting and an ending point for the mails
                            gte: date,
                            lte: date,
                        }
                    },
                    select:{
                        id:true
                    }
                }
            }
        });

    }


}