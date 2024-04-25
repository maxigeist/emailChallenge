import {ExtendedError} from "./interface/extended.error";

export class CredentialsLength implements Error, ExtendedError{
    message: string;
    name: string;

    constructor() {
        this.name = "Username and password length"
        this.message = "The length of the username has to have at least 2 characters and the length of the password has to have " +
            "at least 8 characters."
    }

    getAsJson(){
        return {
            status:this.getStatus(),
            success:false,
            message:this.message
        }
    }

    getStatus(){
        return 409
    }

}