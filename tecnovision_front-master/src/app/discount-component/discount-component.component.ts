import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscountServiceService } from '../services/discount-service.service';
import { Discount } from './discount';
import { TimeoutError } from 'rxjs';
import { FormHandlerMethods } from '../form-handler-methods';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-discount-component',
  templateUrl: './discount-component.component.html',
  styleUrls: ['./discount-component.component.css']
})
export class DiscountComponentComponent implements OnInit {

  title = 'DESCUENTO';
  discount: Discount;
  formHandlerMethods: FormHandlerMethods;
  operation: string;
  saveButtonText: string;
  messageClass: string;
  message: string;
  hide: boolean;
  list: boolean;
  submitBtn: boolean;
  formResponse: string[];
  discountList: Discount[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private discountService: DiscountServiceService,
    private modalService: NgbModal) {
    this.discount = new Discount();
    this.formHandlerMethods = new FormHandlerMethods();
    this.router.events.subscribe(() => {
      if (this.operation !== this.route.snapshot.params.operation) {
        this.operation = this.route.snapshot.params.operation;
        this.checkRoute();
      }
    });
  }

  ngOnInit(): void {
    this.hide = true;
    this.list = false;
    switch (this.route.snapshot.params.operation) {
      case 'list':
        this.list = true;
        break;
      case 'save':
        this.submitBtn = true;
        this.saveButtonText = 'GUARDAR';
        break;
    }
  }

  checkRoute(): void {
    this.hide = true;
    this.list = false;
    switch (this.operation) {
      case 'list':
        this.listDiscounts();
        this.list = true;
        break;
      case 'view':
        this.viewDiscount();
        break;
      default:
        this.submitBtn = true;
        this.saveButtonText = 'GUARDAR';
        break;
    }
  }

  listDiscounts(): void {
    this.discountService.list().subscribe(result => this.serverResponseHandler(result));
  }

  viewDiscount(): void {
    this.submitBtn = false;
    this.saveButtonText = 'EDITAR';
    const id = this.route.snapshot.params.id;
    this.discountService.view(id).subscribe(result => this.serverResponseHandler(result));
  }

  onSubmit(): void {
    this.discountService.save(this.discount).subscribe(result => this.serverResponseHandler(result));
  }

  serverResponseHandler(result: any): void {
    try {
      if (result instanceof TimeoutError) {
        throw new Error("Error de conexión con el servidor");
      } else {
        switch (this.operation) {
          case 'list':
            this.discountList = result;
            if (this.discountList.length == 0) {
              this.message = 'No hay descuentos registrados en el sistema';
              this.messageClass = 'alert alert-warning mb-0';
              this.hide = false;
            }
            break;
          case 'view':
            this.discount = result;
            this.discount.value *= 100;
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
      document.getElementById('saveButton').setAttribute('disabled', 'true');
    }
    this.formHandlerMethods.showModal(this.message, messageClass, this.modalService, 'main');
  }

  changeButtonState(): void {
    this.submitBtn = true;
    this.saveButtonText = 'GUARDAR';
    this.operation = 'update';
  }

}
