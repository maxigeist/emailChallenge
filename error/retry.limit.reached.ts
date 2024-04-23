import {ExtendedError} from "./interface/extended.error";


export class RetryLimitReached implements Error, ExtendedError{

    message: string;
    name: string;


    constructor() {
        this.message = "The amount of tries for this service was reached"
        this.name = "Retry email limit was reached "
    }


    getAsJson(): { status: number; success: boolean; message: string } {
        return {message: this.message, status: this.getStatus(), success: false};
    }

    getStatus(): number {
        return 400;
    }

}