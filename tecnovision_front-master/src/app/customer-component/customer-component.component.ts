import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerServiceService } from '../services/customer-service.service';
import { Customer } from './customer';
import { City } from '../extras/city';
import { CityServiceService } from '../services/city-service.service';
import { AdministratorServiceService } from '../services/administrator-service.service';
import { TimeoutError } from 'rxjs';
import { FormHandlerMethods } from '../form-handler-methods';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-component',
  templateUrl: './customer-component.component.html',
  styleUrls: ['./customer-component.component.css']
})
export class CustomerComponentComponent implements OnInit {

  title = 'CLIENTE';
  customer: Customer;
  formHandlerMethods: FormHandlerMethods;
  operation: string;
  saveButtonText: string;
  registerRedirect: string;
  messageClass: string;
  registerClass: string;
  message: string;
  hide: boolean;
  list: boolean;
  submitBtn: boolean;
  formResponse: string[];
  customerList: Customer[];
  cities: City[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerServiceService,
    private administratorService: AdministratorServiceService,
    private cityService: CityServiceService,
    private modalService: NgbModal) {
    this.customer = new Customer();
    this.customer.city = new City();
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
    if (this.operation == 'register') {
      this.registerClass = 'container mt-5';
    }
    switch (this.route.snapshot.params.operation) {
      case 'list':
        this.list = true;
        break;
      case 'register':
        this.administratorService.view('1').subscribe(result => this.customer.administrator = result);
        this.registerRedirect = '/login';
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
        this.listCustomers();
        this.list = true;
        break;
      case 'view':
        this.registerRedirect = '/main';
        this.viewCustomer();
        break;
      default:
        this.administratorService.view('1').subscribe(result => this.customer.administrator = result);
        this.submitBtn = true;
        this.saveButtonText = 'GUARDAR';
        break;
    }
  }

  chargeCitiesList(): void {
    this.cityService.list().subscribe(result => this.cities = result);
  }

  listCustomers(): void {
    this.customerService.list().subscribe(result => this.serverResponseHandler(result));
  }

  viewCustomer(): void {
    this.submitBtn = false;
    this.saveButtonText = 'EDITAR';
    const id = this.route.snapshot.params.id;
    this.customerService.view(id).subscribe(result => this.serverResponseHandler(result));
  }

  onSubmit(): void {
    if (this.customer.city.cityId > 0) {
      this.customer.city.cityName = this.searchCityName(this.customer.city.cityId);
      this.customerService.save(this.customer).subscribe(result => this.serverResponseHandler(result));
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
            this.customerList = result;
            if (this.customerList.length == 0) {
              this.message = 'No hay clientes registrados en el sistema';
              this.messageClass = 'alert alert-warning mb-0';
              this.hide = false;
            }
            break;
          case 'view':
            this.customer = result;
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
    let route  = (this.operation == 'register') ? '/login' : '/main';
    this.formHandlerMethods.showModal(this.message, messageClass, this.modalService, route);
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
