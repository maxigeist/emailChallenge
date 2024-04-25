import {MissingFields} from "../error/missing.fields";


export async function checkMissingFields(fields: (string | undefined)[]):Promise<boolean>{
    for (const field of fields) {
        if (field == undefined){
            throw new MissingFields()
        }
    }
    return true
}