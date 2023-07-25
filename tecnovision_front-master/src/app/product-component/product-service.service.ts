import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product';
import { Observable, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import backend_server_config from '../backend_server_config.json';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private url: string;
  private host: string = backend_server_config.host;
  private port: string = backend_server_config.port;

  constructor(private http: HttpClient) {
  }

  public save(product: Product): Observable<string[]> {
    this.url = 'http://' + this.host + this.port + '/product/save';
    return this.http.post<string[]>(this.url, product).pipe(timeout(10000), catchError(err => {
      return of(err);
    }));;;
  }

  public view(id: string): Observable<Product> {
    this.url = 'http://' + this.host + this.port + '/product/view/'.concat(id);
    return this.http.get<Product>(this.url).pipe(timeout(10000), catchError(err => {
      return of(err);
    }));;;
  }

  public list(): Observable<Product[]> {
    this.url = 'http://' + this.host + this.port + '/product/list';
    return this.http.get<Product[]>(this.url).pipe(timeout(10000), catchError(err => {
      return of(err);
    }));;;
  }

}
