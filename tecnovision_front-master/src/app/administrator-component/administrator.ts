import { City } from "../extras/city";

export class Administrator {

    administratorId: number;
    document: number;
    email: string;
    state: boolean = true;
    name: string;
    lastName: string;
    phone: bigint;
    address: string;
    city: City;
    password: string;
    

}
