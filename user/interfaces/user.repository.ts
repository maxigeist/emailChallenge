import { User } from "@prisma/client";

export interface UserRepository{

    register(name:string, email:string, password:string):Promise<string | undefined>

    getUser(email:string):Promise <string | undefined>

    login(email:string, password:string):Promise <User | undefined>


}