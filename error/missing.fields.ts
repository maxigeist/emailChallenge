import {ExtendedError} from "./interface/extended.error";

export class MissingFields implements Error, ExtendedError{

    name: string;
    message: string;

    constructor (){
        this.name = "Missing fields"
        this.message = "This request is missing some fields"

    }

    getAsJson(): { status: number; success: boolean; message: string } {
        return {message: this.message, status: this.getStatus(), success: false};
    }

    getStatus(): number {
        return 400;
    }


}