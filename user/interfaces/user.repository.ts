import { User } from "@prisma/client";

export interface UserRepository{

    register(name:string, email:string, password:string):Promise<User | undefined>

    getUser(email:string):Promise <User | undefined>

    login(email:string, password:string):Promise <User | undefined>


}