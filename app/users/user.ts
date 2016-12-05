export class User{
    name:string;
    email:string;
    phone:string;
    address:Address = new Address();
}

export class Address{
    city:string;
    street:string;
    suite:string;
    zipcode:string;
}