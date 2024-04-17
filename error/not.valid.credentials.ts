export class NotValidCredentials implements Error{

    name: string;
    message: string;
    stack?: string | undefined;
    
    constructor (){
        this.name = "Not valid credentials"
        this.message = "The credentials do not match any existing user"

    }


}