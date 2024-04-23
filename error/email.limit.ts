import {ExtendedError} from "./interface/extended.error";

export class EmailLimit implements Error, ExtendedError{

    name: string;
    message: string;

    constructor (){
        this.name = "Email limit reached"
        this.message = "You have reached the limit of mails sent in a day"

    }

    getAsJson(): { status: number; success: boolean; message: string } {
        return {message: this.message, status: this.getStatus(), success: false};
    }

    getStatus(): number {
        return 429;
    }

}