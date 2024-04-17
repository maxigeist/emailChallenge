export class EmailExistsError implements Error{

    name: string;
    message: string;
    stack?: string | undefined;
    
    constructor (){
        this.name = "EmailExsitsEror"
        this.message = "A user with this mail already exists"

    }


}