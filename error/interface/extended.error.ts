

export interface ExtendedError {

    getStatus():number

    getAsJson():{status:number,success:boolean,message:string}
}