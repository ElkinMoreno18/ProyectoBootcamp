import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Supplier } from '../supplier-component/supplier';
import { Observable, of } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';
import backend_server_config from '../backend_server_config.json';

@Injectable({
  providedIn: 'root'
})
export class SupplierServiceService {

  private url: string;
  private host: string = backend_server_config.host;
  private port: string = backend_server_config.port;

  constructor(private http: HttpClient) {
  }

  public save(supplier: Supplier): Observable<string[]> {
    this.url = 'http://' + this.host + this.port + '/supplier/save';
    return this.http.post<string[]>(this.url, supplier).pipe(timeout(10000), catchError(err =>{return of(err);}));;
  }

  public view(id: string): Observable<Supplier> {
    this.url = 'http://' + this.host + this.port + '/supplier/view/'.concat(id)
    return this.http.get<Supplier>(this.url).pipe(timeout(10000), catchError(err =>{return of(err);}));;
  }

  public list(): Observable<Supplier[]>{
    this.url = 'http://' + this.host + this.port + '/supplier/list';
    return this.http.get<Supplier[]>(this.url).pipe(timeout(10000), catchError(err =>{return of(err);}));;
  }

}
