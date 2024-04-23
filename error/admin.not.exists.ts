import {ExtendedError} from "./interface/extended.error";

export class AdminNotExists implements Error, ExtendedError{
    message: string;
    name: string;

    constructor() {
        this.name = "Admin does not exist"
        this.message = "This credentials don't match a valid admin"
    }

    getAsJson(){
        return {
            status:this.getStatus(),
            success:false,
            message:this.message
        }
    }

    getStatus(){
        return 403
    }

}