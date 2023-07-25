import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryServiceService } from '../services/category-service.service';
import { DiscountServiceService } from '../services/discount-service.service';
import { Category } from './category';
import { Discount } from '../discount-component/discount';
import { TimeoutError } from 'rxjs';
import { FormHandlerMethods } from '../form-handler-methods';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category-component',
  templateUrl: './category-component.component.html',
  styleUrls: ['./category-component.component.css']
})
export class CategoryComponentComponent implements OnInit {

  title = 'CATEGORIA';
  category: Category;
  formHandlerMethods: FormHandlerMethods;
  operation: string;
  saveButtonText: string;
  messageClass: string;
  message: string;
  hide: boolean;
  list: boolean;
  submitBtn: boolean;
  discountId: number = 0;
  formResponse: string[];
  categoryList: Category[];
  discountList: Discount[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private discountService: DiscountServiceService,
    private categoryService: CategoryServiceService,
    private modalService: NgbModal) {
    this.category = new Category();
    this.category.discount = new Discount();
    this.formHandlerMethods = new FormHandlerMethods();
    this.submitBtn = false;
    this.router.events.subscribe(() => {
      if (this.operation !== this.route.snapshot.params.operation) {
        this.operation = this.route.snapshot.params.operation;
        this.checkRoute();
      }
    });
  }

  ngOnInit(): void {
    this.chargeDiscountList();
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
        this.listCategories();
        this.list = true;
        break;
      case 'view':
        this.viewCategory();
        break;
      default:
        this.submitBtn = true;
        this.saveButtonText = 'GUARDAR';
        break;
    }
  }

  chargeDiscountList(): void {
    this.discountService.list().subscribe(result => this.discountList = result);
  }

  listCategories(): void {
    this.categoryService.list().subscribe(result => this.serverResponseHandler(result));
  }

  viewCategory(): void {
    this.submitBtn = false;
    this.saveButtonText = 'EDITAR';
    const id = this.route.snapshot.params.id;
    this.categoryService.view(id).subscribe(result => this.serverResponseHandler(result));
  }

  onSubmit(): void {
    this.category.discount = this.getDiscountValue(this.category.discount.discountId);
    this.categoryService.save(this.category).subscribe(result => this.serverResponseHandler(result));
  }

  serverResponseHandler(result: any): void {
    try {
      if (result instanceof TimeoutError) {
        throw new Error("Error de conexión con el servidor");
      } else {
        switch (this.operation) {
          case 'list':
            this.categoryList = result;
            if (this.categoryList.length == 0) {
              this.message = 'No hay categorías registradas en el sistema';
              this.messageClass = 'alert alert-warning mb-0';
              this.hide = false;
            }
            break;
          case 'view':
            this.category = result;
            if (this.category.discount == null) {
              this.category.discount = new Discount();
            }
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

  getDiscountValue(id: number): Discount {
    let newDiscount = new Discount();
    this.discountList.forEach(discount => {
      if (discount.discountId == id) {
        newDiscount = discount;
      }
    });
    return newDiscount;
  }

}

