import {CredentialsLength} from "../error/credentials.length";


export async function checkUsernamePasswordLength(username:string, password:string): Promise<void>{
    if (!(username.length > 1 && password.length >= 8)){
        throw new CredentialsLength()
    }
}