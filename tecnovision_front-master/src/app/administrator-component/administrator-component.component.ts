import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Administrator } from './administrator';
import { City } from '../extras/city';
import { AdministratorServiceService } from '../services/administrator-service.service';
import { CityServiceService } from '../services/city-service.service';
import { TimeoutError } from 'rxjs';
import { FormHandlerMethods } from '../form-handler-methods';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-administrator-component',
  templateUrl: './administrator-component.component.html',
  styleUrls: ['./administrator-component.component.css']
})
export class AdministratorComponentComponent implements OnInit {

  title = 'ADMINISTRADOR';
  administrator: Administrator;
  formHandlerMethods: FormHandlerMethods;
  operation: string;
  saveButtonText: string;
  messageClass: string;
  message: string;
  hide: boolean;
  list: boolean;
  submitBtn: boolean;
  formResponse: string[];
  administratorList: Administrator[];
  cities: City[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private administratorService: AdministratorServiceService,
    private cityService: CityServiceService,
    private modalService: NgbModal) {
    this.administrator = new Administrator();
    this.administrator.city = new City();
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
    switch (this.route.snapshot.params.operation) {
      case 'list':
        this.list = true;
        break;
      case 'save':
        this.submitBtn = true;
        this.saveButtonText = 'GUARDAR';
        break;
    }
    this.chargeCitiesList();
  }

  checkRoute(): void {
    this.list = false;
    switch (this.operation) {
      case 'list':
        this.listAdministrators();
        this.list = true;
        break;
      case 'view':
        this.viewAdministrator();
        break;
      case 'save':
        this.submitBtn = true;
        this.saveButtonText = 'GUARDAR';
        break;
    }
  }

  chargeCitiesList(): void {
    this.cityService.list().subscribe(result => this.cities = result);
  }

  listAdministrators(): void {
    this.administratorService.list().subscribe(result => this.serverResponseHandler(result));
  }

  viewAdministrator(): void {
    this.submitBtn = false;
    this.saveButtonText = 'EDITAR';
    const id = this.route.snapshot.params.id;
    this.administratorService.view(id).subscribe(result => {
      this.serverResponseHandler(result);
    });
  }

  onSubmit(): void {
    if (this.administrator.city.cityId > 0) {
      this.administrator.city.cityName = this.searchCityName(this.administrator.city.cityId);
      this.administratorService.save(this.administrator).subscribe(result => {
        this.serverResponseHandler(result);
      });
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
            this.administratorList = result
            if (this.administratorList.length == 0) {
              this.message = 'No hay administradores registrados en el sistema';
              this.messageClass = 'alert alert-success';
              this.hide = false;
            }
            break;
          case 'view':
            this.administrator = result;
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
        return element.cityName;
      }
    });
    return name;
  }

}