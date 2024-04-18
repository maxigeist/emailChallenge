export class EmailExistsError implements Error{

    name: string;
    message: string;
    
    constructor (){
        this.name = "A user with that email already exists"
        this.message = "A user with this mail already exists"

    }


}