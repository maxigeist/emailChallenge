export class AdminNotExists implements Error{
    message: string;
    name: string;

    constructor() {
        this.name = "Admin does not exist"
        this.message = "This credentials don't match a valid admin"
    }

}