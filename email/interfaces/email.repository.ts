


export interface EmailRepository{



    register(senderEmail:string,forwardEmail:string, subject:string, body:string):Promise<string | undefined>

}