import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../customer-component/customer';
import { Observable, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import backend_server_config from '../backend_server_config.json';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  private url: string;
  private host: string = backend_server_config.host;
  private port: string = backend_server_config.port;

  constructor(private http: HttpClient) {
  }

  public save(customer: Customer): Observable<string[]> {
    this.url = 'http://' + this.host + this.port + '/customer/save';
    return this.http.post<string[]>(this.url, customer).pipe(timeout(10000), catchError(err => {
      return of(err);
    }));;
  }

  public view(id: string): Observable<Customer> {
    this.url = 'http://' + this.host + this.port + '/customer/view/'.concat(id);
    return this.http.get<Customer>(this.url).pipe(timeout(10000), catchError(err => {
      return of(err);
    }));;
  }

  public list(): Observable<Customer[]> {
    this.url = 'http://' + this.host + this.port + '/customer/list';
    return this.http.get<Customer[]>(this.url).pipe(timeout(10000), catchError(err => {
      return of(err);
    }));;
  }

}
