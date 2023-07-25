import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierServiceService } from '../services/supplier-service.service';
import { Supplier } from './supplier';
import { City } from '../extras/city';
import { CityServiceService } from '../services/city-service.service';
import { TimeoutError } from 'rxjs';
import { FormHandlerMethods } from '../form-handler-methods';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-supplier-component',
  templateUrl: './supplier-component.component.html',
  styleUrls: ['./supplier-component.component.css']
})
export class SupplierComponentComponent implements OnInit {

  title = 'PROVEEDOR';
  formHandlerMethods: FormHandlerMethods;
  supplier: Supplier;
  operation: string;
  saveButtonText: string;
  message: string;
  messageClass: string;
  hide: boolean;
  list: boolean;
  submitBtn: boolean;
  formResponse: string[];
  supplierList: Supplier[];
  cities: City[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supplierService: SupplierServiceService,
    private cityService: CityServiceService,
    private modalService: NgbModal) {
    this.supplier = new Supplier();
    this.supplier.city = new City();
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
    this.chargeCitiesList();
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
        this.listSuppliers();
        this.list = true;
        break;
      case 'view':
        this.viewSupplier();
        break;
      default:
        this.submitBtn = true;
        this.saveButtonText = 'GUARDAR';
        break;
    }
  }

  chargeCitiesList(): void {
    this.cityService.list().subscribe(result => this.cities = result);
  }

  listSuppliers(): void {
    this.supplierService.list().subscribe(result => this.serverResponseHandler(result));
  }

  viewSupplier(): void {
    this.submitBtn = false;
    this.saveButtonText = 'EDITAR';
    const id = this.route.snapshot.params.id;
    this.supplierService.view(id).subscribe(result => this.serverResponseHandler(result));
  }

  onSubmit(): void {
    if (this.supplier.city.cityId > 0) {
      this.supplier.city.cityName = this.searchCityName(this.supplier.city.cityId);
      this.supplierService.save(this.supplier).subscribe(result => this.serverResponseHandler(result));
    } else {
      document.getElementById('cityError').innerHTML = 'Debe seleccionar una ciudad';
      document.getElementById('city').focus();
    }
  }

  serverResponseHandler(result: any): void {
    try {
      if (result instanceof TimeoutError) {
        throw new Error("Error de conexión con el servidor");
      } else {
        switch (this.operation) {
          case 'list':
            this.supplierList = result;
            if (this.supplierList.length == 0) {
              this.message = 'No hay proveedores registrados en el sistema';
              this.messageClass = 'alert alert-warning mb-0';
              this.hide = false;
            }
            break;
          case 'view':
            this.supplier = result;
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

  searchCityName(id: number): string {
    var name = '';
    this.cities.forEach(element => {
      if (element.cityId == id) {
        name = element.cityName;
      }
    });
    return name;
  }

}
