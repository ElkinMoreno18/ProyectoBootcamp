import { Customer } from '../customer-component/customer';
import { PaymentMethod } from '../extras/payment-method';
import { OrderDetail } from './order-detail';

export class Order {

    orderId: number;
    deliveryDate: Date = new Date();
    dispatchDate: Date = new Date();
    totalPrice: number = 0;
    state: string = "active";
    customer: Customer;
    paymentMethod: PaymentMethod;
    orderDetailList: OrderDetail[];

}
