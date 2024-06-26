import {ExtendedError} from "./interface/extended.error";


export class CantDecodeToken implements Error, ExtendedError{

    message: string;
    name: string;


    constructor() {
        this.message = "The token is not valid or there is no token present"
        this.name = "Could not decode the token"
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