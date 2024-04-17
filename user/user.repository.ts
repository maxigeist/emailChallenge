import { prisma } from "../db/db";
import { UserRepository } from "./interfaces/user.repository";
import { User } from "@prisma/client";

export class UserRepositoryImpl implements UserRepository{
  
  async login(email: string, password: string): Promise<User | undefined> {
    const user = await prisma.user.findFirst({
        where: {
            email: email,
            password: password
        },
    });

    return user ? user : undefined;
}

  
  async register(name: string, email: string, password: string): Promise<string | undefined> {
    const user = await prisma.user.create({
      data:{
        email:email,
        name:name,
        password:password
      }
    })
    return user.name
    
  }


  async getUser(email:string):Promise<string | undefined>{
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    })
    return user?.email
  }
    

    
    


}