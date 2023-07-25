import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from './product-service.service';
import { Product } from './product';
import { Category } from '../category-component/category';
import { Supplier } from '../supplier-component/supplier';
import { Brand } from '../brand-component/brand';
import { BrandServiceService } from '../services/brand-service.service';
import { CategoryServiceService } from '../services/category-service.service';
import { SupplierServiceService } from '../services/supplier-service.service';
import { TimeoutError } from 'rxjs';
import { FormHandlerMethods } from '../form-handler-methods';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.css']
})
export class ProductComponentComponent implements OnInit {

  title = 'PRODUCTO';
  product: Product;
  formHandlerMethods: FormHandlerMethods;
  operation: string;
  saveButtonText: string;
  messageClass: string = 'alert alert-success';
  message: string;
  hide: boolean;
  showImage: boolean = false;
  list: boolean;
  submitBtn: boolean;
  brandId: number = 0;
  categoryId: number = 0;
  supplierId: number = 0;
  formResponse: string[];
  productList: Product[];
  categoryList: Category[];
  brandList: Brand[];
  supplierList: Supplier[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private brandService: BrandServiceService,
    private categoryService: CategoryServiceService,
    private supplierService: SupplierServiceService,
    private productService: ProductServiceService,
    private modalService: NgbModal) {
    this.product = new Product();
    this.product.category = new Category();
    this.product.brand = new Brand();
    this.product.supplier = new Supplier();
    this.formHandlerMethods = new FormHandlerMethods();
    this.router.events.subscribe(() => {
      if (this.operation !== this.route.snapshot.params.operation) {
        this.operation = this.route.snapshot.params.operation;
        this.checkRoute();
      }
    });
  }

  ngOnInit(): void {
    this.chargeCategoryList();
    this.chargeBrandList();
    this.chargeSupplierList();
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
        this.listProducts();
        this.list = true;
        break;
      case 'view':
        this.viewProduct();
        break;
      case 'save':
        this.submitBtn = true;
        this.saveButtonText = 'GUARDAR';
        break;
    }
  }

  chargeCategoryList(): void {
    this.categoryService.list().subscribe(result => this.categoryList = result);
  }

  chargeBrandList(): void {
    this.brandService.list().subscribe(result => this.brandList = result);
  }

  chargeSupplierList(): void {
    this.supplierService.list().subscribe(result => this.supplierList = result);
  }

  listProducts(): void {
    this.productService.list().subscribe(result => this.serverResponseHandler(result));
  }

  viewProduct(): void {
    this.submitBtn = false;
    this.saveButtonText = 'EDITAR';
    const id = this.route.snapshot.params.id;
    this.productService.view(id).subscribe(result => { this.serverResponseHandler(result); });
  }

  onSubmit(): void {
    let canSaveProduct = true;
    if (this.product.category.categoryId == 0) {
      canSaveProduct = false;
      document.getElementById('categoryError').innerHTML = 'Debe seleccionar una categoría';
    }
    if (this.product.brand.brandId == 0) {
      canSaveProduct = false;
      document.getElementById('brandError').innerHTML = 'Debe seleccionar una marca';
    }
    if (this.product.supplier.supplierId == 0) {
      canSaveProduct = false;
      document.getElementById('supplierError').innerHTML = 'Debe seleccionar un proveedor';
    }
    if (canSaveProduct) {
      this.productService.save(this.product).subscribe(result => this.serverResponseHandler(result));
    }
  }

  serverResponseHandler(result: any): void {
    try {
      if (result instanceof TimeoutError) {
        throw new Error("Error de conexión con el servidor");
      } else {
        switch (this.operation) {
          case 'list':
            this.productList = result;
            if (this.productList.length == 0) {
              this.message = 'No hay productos registrados en el sistema';
              this.messageClass = 'alert alert-warning mb-0';
              this.hide = false;
            }
            break;
          case 'view':
            this.product = result;
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

  showImageFrame(): void {
    this.showImage = !this.showImage;
  }

  preventNonNumericalInput(e): void {
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);
    if (!charStr.match(/^[0-9]+$/))
      e.preventDefault();
  }

  cleanComboboxError(): void {
    if (this.product.category.categoryId > 0) {
      document.getElementById('categoryError').innerHTML = '';
    }
    if (this.product.brand.brandId > 0) {
      document.getElementById('brandError').innerHTML = '';
    }
    if (this.product.supplier.supplierId > 0) {
      document.getElementById('supplierError').innerHTML = '';
    }
  }

}
