import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandServiceService } from '../services/brand-service.service';
import { Brand } from './brand';
import { TimeoutError } from 'rxjs';
import { FormHandlerMethods } from '../form-handler-methods';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-brand-component',
  templateUrl: './brand-component.component.html',
  styleUrls: ['./brand-component.component.css']
})
export class BrandComponentComponent implements OnInit {

  title = 'MARCA';
  brand: Brand;
  formHandlerMethods: FormHandlerMethods;
  operation: string;
  saveButtonText: string;
  messageClass: string;
  message: string;
  list: boolean;
  submitBtn: boolean;
  hide: boolean;
  formResponse: string[];
  brandList: Brand[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private brandService: BrandServiceService,
    private modalService: NgbModal) {
    this.brand = new Brand();
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
    this.list = false;
    this.hide = true;
    switch (this.operation) {
      case 'list':
        this.listBrands();
        this.list = true;
        break;
      case 'view':
        this.viewBrand();
        break;
      default:
        this.submitBtn = true;
        this.saveButtonText = 'GUARDAR';
        break;
    }
  }

  listBrands(): void {
    this.brandService.list().subscribe(result => this.serverResponseHandler(result));
  }

  viewBrand(): void {
    this.submitBtn = false;
    this.saveButtonText = 'EDITAR';
    const id = this.route.snapshot.params.id;
    this.brandService.view(id).subscribe(result => this.serverResponseHandler(result));
  }

  onSubmit(): void {
    this.brandService.save(this.brand).subscribe(result => this.serverResponseHandler(result));
  }

  serverResponseHandler(result: any): void {
    try {
      if (result instanceof TimeoutError) {
        throw new Error("Error de conexión con el servidor");
      } else {
        switch (this.operation) {
          case 'list':
            this.brandList = result;
            if (this.brandList.length == 0) {
              this.message = 'No hay marcas registradas en el sistema';
              this.messageClass = 'alert alert-warning mb-0';
              this.hide = false;
            }
            break;
          case 'view':
            this.brand = result;
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
