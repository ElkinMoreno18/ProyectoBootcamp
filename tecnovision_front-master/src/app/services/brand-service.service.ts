import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../brand-component/brand';
import { Observable, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import backend_server_config from '../backend_server_config.json';

@Injectable({
  providedIn: 'root'
})
export class BrandServiceService {

  private url: string;
  private host: string = backend_server_config.host;
  private port: string = backend_server_config.port;

  constructor(private http: HttpClient) {
  }

  public save(brand: Brand): Observable<string[]> {
    this.url = 'http://' + this.host + this.port + '/brand/save';
    return this.http.post<string[]>(this.url, brand).pipe(timeout(10000), catchError(err => {
      return of(err);
    }));;;
  }

  public view(id: string): Observable<Brand> {
    this.url = 'http://' + this.host + this.port + '/brand/view/'.concat(id);
    return this.http.get<Brand>(this.url).pipe(timeout(10000), catchError(err => {
      return of(err);
    }));;;
  }

  public list(): Observable<Brand[]> {
    this.url = 'http://' + this.host + this.port + '/brand/list';
    return this.http.get<Brand[]>(this.url).pipe(timeout(10000), catchError(err => {
      return of(err);
    }));;;
  }

}
