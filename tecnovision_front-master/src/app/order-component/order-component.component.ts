import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product-component/product';
import { Service } from '../service-component/service';
import { Order } from './order';
import { OrderServiceService } from '../services/order-service.service';
import { ProductServiceService } from '../product-component/product-service.service';
import { CustomerServiceService } from '../services/customer-service.service';
import { Customer } from '../customer-component/customer';
import { OrderDetail } from './order-detail';
import { PaymentMethodServiceService } from '../services/payment-method-service.service';
import { PaymentMethod } from '../extras/payment-method';
import { City } from '../extras/city';
import { ServiceServiceService } from '../services/service-service.service';
import { TimeoutError } from 'rxjs';
import { FormHandlerMethods } from '../form-handler-methods';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-component',
  templateUrl: './order-component.component.html',
  styleUrls: ['./order-component.component.css']
})
export class OrderComponentComponent implements OnInit {

  title = 'PEDIDO';
  order: Order;
  formHandlerMethods: FormHandlerMethods;
  operation: string;
  message: string;
  saveButtonText: string;
  messageClass: string;
  userType: string;
  filterType: string;
  hide: boolean;
  list: boolean;
  paymentChecked: boolean = false;
  canAddProduct: boolean;
  fieldTextType: boolean;
  submitBtn: boolean;
  filter: number;
  productId: number = 0;
  serviceId: number = 0;
  formResponse: string[];
  productList: Product[];
  serviceList: Service[];
  ordersList: Order[];
  paymentMethodList: PaymentMethod[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderServiceService,
    private productService: ProductServiceService,
    private serviceService: ServiceServiceService,
    private customerService: CustomerServiceService,
    private paymentMethodService: PaymentMethodServiceService,
    private modalService: NgbModal) {
    this.initObjects();
    this.formHandlerMethods = new FormHandlerMethods();
    this.router.events.subscribe(() => {
      if (this.operation !== this.route.snapshot.params.operation) {
        this.operation = this.route.snapshot.params.operation;
        this.checkRoute();
        this.initObjects();
      }
    });
  }

  ngOnInit(): void {
    this.checkUserType();
    this.hide = true;
    this.list = this.canAddProduct = this.paymentChecked = false;
    switch (this.route.snapshot.params.operation) {
      case 'list':
        this.list = true;
        break;
      case 'save':
        this.chargeCustomerInfo();
        this.chargeProductList();
        this.chargeServiceList();
        this.submitBtn = false;
        this.saveButtonText = 'GUARDAR';
        break;
    }
    this.chargePaymentMethodList();
  }

  checkRoute(): void {
    this.filterType = 'None';
    this.filter = 0;
    this.hide = true;
    this.list = this.canAddProduct = this.paymentChecked = false;
    switch (this.operation) {
      case 'list':
        this.checkUserType();
        this.list = true;
        break;
      case 'view':
        this.submitBtn = true;
        this.viewOrder();
        this.chargeCustomerInfo();
        break;
      case 'save':
        this.submitBtn = false;
        this.saveButtonText = 'GUARDAR';
        this.chargeCustomerInfo();
        this.initObjects();
        break;
    }
  }

  checkUserType(): void {
    const userInfo = JSON.parse(sessionStorage.getItem('userSessionInfo'));
    this.userType = userInfo.userType;
    if (this.userType == 'customer') {
      this.order.customer.customerId = parseInt(userInfo.userId);
    }
  }

  initObjects(): void {
    this.order = new Order();
    var deliveryDate = this.order.deliveryDate;
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    this.order.deliveryDate = deliveryDate;
    this.order.orderDetailList = [];
    this.order.customer = new Customer();
    this.order.customer.city = new City();
    this.order.paymentMethod = new PaymentMethod();
    this.checkUserType();
  }

  chargePaymentMethodList(): void {
    this.paymentMethodService.list().subscribe(result => this.paymentMethodList = result);
  }

  chargeServiceList(): void {
    this.serviceService.list().subscribe(result => this.serviceList = result);
  }

  chargeProductList(): void {
    this.productService.list().subscribe(result => this.productList = result);
  }

  chargeCustomerInfo(): void {
    if (this.userType == 'customer') {
      this.customerService.view(this.order.customer.customerId.toString()).subscribe(result => {
        this.order.customer = result;
      });
    }
  }

  viewOrder(): void {
    this.submitBtn = true;
    this.saveButtonText = 'EDITAR';
    const id = this.route.snapshot.params.id;
    this.orderService.view(id).subscribe(result => this.serverResponseHandler(result));
  }

  listOrders(): void {
    if ((this.filter != 0 && this.filterType != 'None') || this.filter == 0) {
      this.orderService.list(this.order.customer.customerId.toString(), this.filterType).subscribe(result => this.serverResponseHandler(result));
    } else {
      alert("Debe seleccionar una de las opciones del filtro");
    }
  }

  onSubmit(): void {
    if (this.operation == 'update') {
      if (this.order.state == 'inactive') {
        if (confirm("¿Esta seguro de que desea cancelar éste pedido?")) {
          this.sendInfo();
        }
      } else {
        this.sendInfo();
      }
    } else {
      if (this.order.paymentMethod.paymentMethodId > 0) {
        if (this.order.orderDetailList.length > 0) {
          document.getElementById('detailProductError').innerHTML = '';
          document.getElementById('paymentMethodError').innerHTML = '';
          this.sendInfo();
        } else {
          document.getElementById('detailProductError').innerHTML = 'Debe seleccionar al menos un producto';
          document.getElementById('detailProduct').focus();
        }
      } else {
        document.getElementById('paymentMethodError').innerHTML = 'Debe seleccionar una forma de pago';
        document.getElementById('paymentMethod').focus();
      }
    }
  }

  sendInfo(): void {
    this.orderService.save(this.order).subscribe(result => this.serverResponseHandler(result));
  }

  serverResponseHandler(result: any): void {
    try {
      if (result instanceof TimeoutError) {
        throw new Error("Error de conexión con el servidor");
      } else {
        switch (this.operation) {
          case 'list':
            this.ordersList = result;
            if (this.ordersList.length == 0) {
              this.message = 'No hay pedidos registrados en el sistema';
              this.messageClass = 'alert alert-warning mb-0';
              this.hide = false;
            }
            break;
          case 'view':
            this.order = result;
            break;
          default:
            this.formResponse = result;
            this.checkResponse(this.formResponse);
            this.formResponse = [];
            break;
        }
      }
    } catch (e) {
      this.messageClass = 'alert alert-danger';
      this.message = e;
      this.hide = false;
      setTimeout(() => {
        this.hide = true;
      }, 3000);
    }
  }

  checkResponse(messages: string[]): void {
    this.hide = this.formHandlerMethods.cleanFormFields(messages);
    let messageClass = (messages[0].includes('Error') || messages[0].includes('existe')) ? 'alert alert-danger' : 'alert alert-success';
    this.message = messages[0];
    if (this.message.includes('ha sido') || messages[0].includes('actualizados')) {
      if (this.operation == 'save') {
        messages[0] += " - Fecha aproximada de entrega: " + this.order.deliveryDate.toLocaleDateString();
      }
      this.message = messages[0];
      document.getElementById('saveButton').setAttribute('disabled', 'true');
    }
    this.formHandlerMethods.showModal(this.message, messageClass, this.modalService, 'main');
  }




  productAlreadyAdded(): number {
    const detailList = this.order.orderDetailList;
    for (let i = 0; i < detailList.length; i++) {
      if (detailList[i].product.productId == this.productId) {
        return i;
      }
    };
    return -1;
  }

  addProduct(): void {
    if (this.productId > 0) {
      let detailPosition = this.productAlreadyAdded();
      let detailQuantity = parseInt((document.getElementById('detailQuantity') as HTMLInputElement).value);
      let detail = new OrderDetail();
      if (detailPosition != -1) {
        detail = this.updateDetail(detail, detailPosition, detailQuantity);
      } else {
        if (detailQuantity > 0 && this.canAddProduct) {
          let product = this.findProductInList(this.productId);
          detail.product = product;
          detail.quantity = detailQuantity;
          detail.unitPrice = parseInt((document.getElementById("productUnitVal") as HTMLInputElement).value);
          if (this.serviceId > 0) {
            detail.service = new Service();
            detail.service = this.findServiceInList(this.serviceId);
            detail.servicePrice = parseInt((document.getElementById('servicePrice') as HTMLInputElement).value);
          }
          detail.totalPrice = parseInt((document.getElementById("detailPrice") as HTMLInputElement).value);
          this.order.orderDetailList.push(detail);
          document.getElementById('quantityError').innerHTML = '';
        } else {
          document.getElementById('quantityError').innerHTML = 'La cantidad del producto es cero o no hay disponibilidad de la cantidad solicitada para este producto';
        }
      }
      this.order.totalPrice += detail.totalPrice;
      this.cleanDetailFields();
      this.serviceId = this.productId = 0;
    } else {
      document.getElementById('detailProductError').innerHTML = 'Debe seleccionar un producto';
      document.getElementById('detailProduct').focus();
    }
  }

  updateDetail(detail: any, detailPosition: number, detailQuantity: number): OrderDetail {
    detail = this.order.orderDetailList[detailPosition];
    const product = this.findProductInList(detail.product.productId);
    if (detailQuantity < product.stock) {
      this.order.totalPrice -= detail.totalPrice;
      detail.quantity += detailQuantity;
      let detailPrice = detail.unitPrice * detail.quantity; // Recalcula el valor del detalle //
      if (detail.service != null) {
        if(detail.service.name.toLowerCase() == 'alquiler'){
          detailPrice = detailPrice * detail.service.value;
          detail.servicePrice = detailPrice;
        } else {
          detail.servicePrice = detailPrice * detail.service.value;
          detailPrice += detail.servicePrice;
        }
      }
      detail.totalPrice = detailPrice;
    } else {
      document.getElementById('quantityError').innerHTML = 'La cantidad del producto es cero o no hay disponibilidad de la cantidad solicitada para este producto';
    }
    return detail;
  }

  findProductInList(id: number): Product {
    var product = new Product();
    let flag = false;
    let position = 0;
    while (!flag) {
      var p = this.productList[position];
      if (p.productId == id) {
        product = p;
        flag = true;
      } else {
        position++;
      }
    }
    return product;
  }

  findServiceInList(id: number): Service {
    var service = null;
    let flag = false;
    let position = 0;
    while (!flag && position < this.serviceList.length) {
      var s = this.serviceList[position];
      if (s.serviceId == id) {
        service = s;
        flag = true;
      } else {
        position++;
      }
    }
    return service;
  }

  setProductPrice(): void {
    this.cleanDetailFields();
    document.getElementById('detailProductError').innerHTML = '';
    var unitPriceInput = document.getElementById('productUnitVal') as HTMLInputElement;
    if (this.productId > 0) {
      var product = this.findProductInList(this.productId);
      let price = product.price;
      if (product.category.discount != null) {
        price = product.price - (product.price * product.category.discount.value);
      }
      unitPriceInput.value = (price).toString();
    }
  }

  setServicePrice(): void {
    var detailPrice = parseInt((document.getElementById('detailPrice') as HTMLInputElement).value);
    if (detailPrice >= 0) {
      var service = this.findServiceInList(this.serviceId);
      if (service != null) {
        detailPrice *= service.value;
        (document.getElementById('servicePrice') as HTMLInputElement).value = detailPrice.toString();
      }
    }
  }

  setDetailPrice(event): void {
    var quantity = parseInt((document.getElementById('detailQuantity') as HTMLInputElement).value);
    const product = this.findProductInList(this.productId);
    if (quantity <= product.stock) {
      this.canAddProduct = true;
      document.getElementById('quantityError').innerHTML = '';
      var unitPriceInput = parseInt((document.getElementById('productUnitVal') as HTMLInputElement).value);
      var service = this.findServiceInList(this.serviceId);
      var serviceName = '';
      var serviceValue = 0;
      var servicePriceInput = document.getElementById('servicePrice') as HTMLInputElement;
      if (service != null) {
        serviceName = service.name;
        serviceValue = service.value;
      }
      var detailPrice = document.getElementById('detailPrice') as HTMLInputElement;
      detailPrice.value = (unitPriceInput * quantity).toString();
      var serviceCost = parseInt(detailPrice.value) * serviceValue;
      if (serviceName.toLowerCase() == 'alquiler') {
        detailPrice.value = (serviceCost).toString();
      } else {
        detailPrice.value = (parseInt(detailPrice.value) + serviceCost).toString();
      }
      servicePriceInput.value = (serviceCost).toString();
    } else {
      if (event.target.id == 'detailQuantity') {
        this.canAddProduct = false;
        document.getElementById('quantityError').innerHTML = 'No hay disponibilidad de la cantidad solicitada para este producto';
      }
    }
  }

  deleteDetail(detail: OrderDetail): void {
    var index = this.order.orderDetailList.indexOf(detail);
    this.order.totalPrice = (this.order.totalPrice - detail.totalPrice);
    this.order.orderDetailList.splice(index, 1);
  }

  changeButtonState(): void {
    this.submitBtn = false;
    this.saveButtonText = 'GUARDAR';
    this.operation = 'update';
  }

  cleanDetailFields(): void {
    (document.getElementById('productUnitVal') as HTMLInputElement).value = '';
    (document.getElementById('detailQuantity') as HTMLInputElement).value = '';
    this.serviceId = 0;
    (document.getElementById('detailPrice') as HTMLInputElement).value = '';
    (document.getElementById('servicePrice') as HTMLInputElement).value = '0';
  }

  preventNonNumericalInput(e): void {
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);
    if (!charStr.match(/^[0-9]+$/))
      e.preventDefault();
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  cleanPaymentMethodErrorText(): void {
    document.getElementById('paymentMethodError').innerHTML = '';
  }

}
