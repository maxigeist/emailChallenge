import {ExtendedError} from "./interface/extended.error";

export class EmailServicesDown implements Error, ExtendedError{

    name: string;
    message: string;

    constructor (){
        this.name = "Email services down"
        this.message = "All the email services are down"
    }

    getAsJson(): { status: number; success: boolean; message: string } {
        return {
            status:this.getStatus(),
            success:false,
            message:this.message
        }
    }

    getStatus(): number {
        return 500;
    }

}