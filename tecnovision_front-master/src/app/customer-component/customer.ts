import { Administrator } from "../administrator-component/administrator";
import { City } from "../extras/city";

export class Customer {

    customerId: number = 0;
    document: number;
    name: string;
    lastName: string;
    phone: BigInteger;
    address: string;
    email: string;
    city: City;
    password: string;
    state: boolean = true;
    administrator: Administrator;

}
