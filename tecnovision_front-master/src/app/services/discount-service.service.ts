import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Discount } from '../discount-component/discount';
import { Observable, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import backend_server_config from '../backend_server_config.json';

@Injectable({
  providedIn: 'root'
})
export class DiscountServiceService {

  private url: string;
  private host: string = backend_server_config.host;
  private port: string = backend_server_config.port;

  constructor(private http: HttpClient) {
  }

  public save(discount: Discount): Observable<string[]> {
    this.url = 'http://' + this.host + this.port + '/discount/save';
    return this.http.post<string[]>(this.url, discount).pipe(timeout(10000), catchError(err => {
      return of(err);
    }));;
  }

  public view(id: string): Observable<Discount> {
    this.url = 'http://' + this.host + this.port + '/discount/view/'.concat(id);
    return this.http.get<Discount>(this.url).pipe(timeout(10000), catchError(err => {
      return of(err);
    }));;
  }

  public list(): Observable<Discount[]>{
    this.url = 'http://' + this.host + this.port + '/discount/list';
    return this.http.get<Discount[]>(this.url).pipe(timeout(10000), catchError(err => {
      return of(err);
    }));;
  }
}