import { User } from "@prisma/client";
import { UserRepository } from "./user.repository";

export interface UserService{
    userRepository: UserRepository;

    register(name:string, email:string, password:string):Promise<User | undefined>

    login(email:string, password:string):Promise<User | undefined>

}