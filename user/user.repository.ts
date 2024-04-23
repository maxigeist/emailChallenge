import { UserRepository } from "./interfaces/user.repository";
import {PrismaClient, User} from "@prisma/client";

export class UserRepositoryImpl implements UserRepository{

  prismaClient:PrismaClient

  constructor(prismaClient:PrismaClient) {
    this.prismaClient = prismaClient
  }



  
  async login(email: string, password: string): Promise<User | undefined> {
    const user = await this.prismaClient.user.findFirst({
        where: {
            email: email,
            password: password
        },
    });

    return user ? user : undefined;
}

  
  async register(name: string, email: string, password: string): Promise<User | undefined> {
    const user = await this.prismaClient.user.create({
      data:{
        email:email,
        name:name,
        password:password
      }
    })
    return user ? user : undefined
    
  }


  async getUser(email:string):Promise<User | undefined>{
    const user = await this.prismaClient.user.findFirst({
      where: {
        email: email,
      },
    })
    return user ? user : undefined
    }
    

    
    


}