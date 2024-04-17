export class EmailExistsError implements Error{

    name: string;
    message: string;
    stack?: string | undefined;
    
    constructor (){
        this.name = "PasswordNotMatch"
        this.message = "The password does not match the existing "

    }


}