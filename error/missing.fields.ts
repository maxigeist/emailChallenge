import {ExtendedError} from "./interface/extended.error";

export class MissingFields implements Error, ExtendedError{

    name: string;
    message: string;

    constructor (){
        this.name = "Missing fields"
        this.message = "This request is missing some fields"

    }

    getAsJson(): { status: number; success: boolean; message: string } {
        return {
            status:this.getStatus(),
            success:false,
            message:this.message
        }
    }

    getStatus(): number {
        return 400;
    }


}