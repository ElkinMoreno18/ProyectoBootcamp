import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Injectable } from '@angular/core';
import { PaymentMethod } from '../extras/payment-method';
import backend_server_config from '../backend_server_config.json';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodServiceService {

  private url: string;
  private host: string = backend_server_config.host;
  private port: string = backend_server_config.port;

  constructor(private http: HttpClient) {
  }

  public list(): Observable<PaymentMethod[]>{
    this.url = 'http://' + this.host + this.port + '/paymentMethod/list';
    return this.http.get<PaymentMethod[]>(this.url);
  }

}
