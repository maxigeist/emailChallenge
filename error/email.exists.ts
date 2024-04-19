import {ExtendedError} from "./interface/extended.error";

export class EmailExistsError implements Error, ExtendedError{

    name: string;
    message: string;
    
    constructor (){
        this.name = "A user with that email already exists"
        this.message = "A user with this mail already exists"

    }

    getAsJson(): { status: number; success: boolean; message: string } {
        return {message: this.message, status: this.getStatus(), success: false};
    }

    getStatus(): number {
        return 403;
    }


}