import { Injectable } from '@angular/core';
import { Order } from '../order-component/order';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import backend_server_config from '../backend_server_config.json';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  private url: string;
  private host: string = backend_server_config.host;
  private port: string = backend_server_config.port;

  constructor(private http: HttpClient) { }

  public save(order: Order): Observable<string[]> {
    this.url = 'http://' + this.host + this.port + '/order/save';
    return this.http.post<string[]>(this.url, order).pipe(timeout(10000), catchError(err => {
      return of(err);
    }));;
  }

  public list(id: string, filter: string): Observable<Order[]> {
    this.url = 'http://' + this.host + this.port + '/order/list';
    return this.http.get<Order[]>(this.url, {
      params: {
        personId: id,
        filter: filter
      }
    }).pipe(timeout(10000), catchError(err => {
      return of(err);
    }));;
  }

  public view(id: string): Observable<Order> {
    this.url = 'http://' + this.host + this.port + '/order/view/'.concat(id);
    return this.http.get<Order>(this.url).pipe(timeout(10000), catchError(err => {
      return of(err);
    }));;
  }

}
