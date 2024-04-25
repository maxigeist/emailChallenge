import {EmailNotValid} from "../error/email.not.valid";

export async function checkValidEmail(email:string): Promise<void>{
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)){
        throw new EmailNotValid()
    }

}