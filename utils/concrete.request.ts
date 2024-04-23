import { TypedRequestBody } from "./request";


export class ConcreteRequest<T> implements TypedRequestBody<T>{
    body: T ;

    constructor(body: T){
        this.body = body
    }

}