import {ExtendedError} from "./interface/extended.error";

export class NotValidCredentials implements Error, ExtendedError{

    name: string;
    message: string;
    stack?: string | undefined;
    
    constructor (){
        this.name = "Not valid credentials"
        this.message = "The credentials do not match any existing user"
    }

    getAsJson(): { status: number; success: boolean; message: string } {
        return {message: this.message, status: this.getStatus(), success: false};
    }

    getStatus(): number {
        return 403;
    }


}