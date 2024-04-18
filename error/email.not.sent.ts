export class EmailNotSentError implements Error{

    name: string;
    message: string;
    stack?: string | undefined;

    constructor (){
        this.name = "The email was not sent"
        this.message = "There was a problem with sending the email"
    }


}