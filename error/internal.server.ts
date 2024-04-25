import {ExtendedError} from "./interface/extended.error";

export class InternalServer implements Error, ExtendedError{
    message: string;
    name: string;

    constructor() {
        this.name = "Internal Server Error"
        this.message = "There has been an internal server error"
    }

    getAsJson(){
        return {
            status:this.getStatus(),
            success:false,
            message:this.message
        }
    }

    getStatus(){
        return 500
    }

}