import { Product } from "../product-component/product";
import { Service } from "../service-component/service";

export class OrderDetail {

    orderDetailOrderId: number;
    product: Product;
    quantity: number;
    unitPrice: number;
    servicePrice: number;
    totalPrice: number = 0;
    service: Service;

}
