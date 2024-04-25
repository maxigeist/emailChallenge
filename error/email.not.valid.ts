import {ExtendedError} from "./interface/extended.error";

export class EmailNotValid implements Error, ExtendedError{

    name: string;
    message: string;

    constructor (){
        this.name = "Email is not valid"
        this.message = "This is not a valid email address"
    }

    getAsJson(): { status: number; success: boolean; message: string } {
        return {
            status:this.getStatus(),
            success:false,
            message:this.message
        }
    }

    getStatus(): number {
        return 405;
    }

}