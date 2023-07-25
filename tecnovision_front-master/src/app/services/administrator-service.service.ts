import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Administrator } from '../administrator-component/administrator';
import { catchError, timeout } from 'rxjs/operators';
import backend_server_config from '../backend_server_config.json';

@Injectable({
  providedIn: 'root'
})
export class AdministratorServiceService {

  private url: string;
  private host: string = backend_server_config.host;
  private port: string = backend_server_config.port;

  constructor(private http: HttpClient) {
  }

  public save(administrator: Administrator): Observable<string[]> {
    this.url = 'http://' + this.host + this.port + '/administrator/save';
    return this.http.post<string[]>(this.url, administrator).pipe(timeout(10000), catchError(err => {
      return of(err);
    }));;;
  }

  public view(id: string): Observable<Administrator> {
    this.url = 'http://' + this.host + this.port + '/administrator/view/'.concat(id);
    return this.http.get<Administrator>(this.url).pipe(timeout(10000), catchError(err => {
      return of(err);
    }));;;
  }

  public list(): Observable<Administrator[]> {
    this.url = 'http://' + this.host + this.port + '/administrator/list';
    return this.http.get<Administrator[]>(this.url).pipe(timeout(10000), catchError(err => {
      return of(err);
    }));;;
  }

}