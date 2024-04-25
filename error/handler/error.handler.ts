import {ExtendedError} from "../interface/extended.error";
import {Response} from "express";


export function returnRes(error:any, res:Response){
    if (isErrorExtendedError(error)) {
        return res.status(error.getStatus()).json(error.getAsJson())
    } else {
        // This is the common error for every error that is not specific
       return  res.status(500).send("Internal server error");
    }
}


//There must be a way that this can be done better
function isErrorExtendedError(error: any): error is ExtendedError {
    return error.getStatus !== undefined &&
        error.getAsJson !== undefined
}



