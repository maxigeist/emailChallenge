import { UserService } from "./interfaces/user.service";
import { UserRepository } from "./interfaces/user.repository"
import { EmailExistsError} from "../error/email.exists";
import { NotValidCredentials} from "../error/not.valid.credentials";
import { User } from "@prisma/client";
import {MissingFields} from "../error/missing.fields";


export class UserServiceImpl implements UserService{
    
    userRepository: UserRepository;


    constructor(userRepository:UserRepository){
        this.userRepository = userRepository
    }

    async login(email: string, password: string): Promise<User | undefined> {
        if (email === undefined || password === undefined){
            throw new MissingFields()
        }

        const user = await this.userRepository.login(email, password)
        if (user == undefined){
            throw new NotValidCredentials()
        }
        return user
    }

    async register(name?: string, email?: string, password?: string): Promise<User | undefined> {
        if(name === undefined || email === undefined || password === undefined){
            throw new MissingFields()
        }
        else
        {
            const user = await this.userRepository.getUser(email)

            if (user != undefined) {
                throw new EmailExistsError()
            }
            return this.userRepository.register(name, email, password)
        }
    }


}