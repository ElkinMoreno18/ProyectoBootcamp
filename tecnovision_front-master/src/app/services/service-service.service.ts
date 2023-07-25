import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from '../service-component/service';
import { Observable, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import backend_server_config from '../backend_server_config.json';

@Injectable({
  providedIn: 'root'
})
export class ServiceServiceService {

  private url: string;
  private host: string = backend_server_config.host;
  private port: string = backend_server_config.port;

  constructor(private http: HttpClient) {
  }

  public save(service: Service): Observable<string[]> {
    this.url = 'http://' + this.host + this.port + '/service/save';
    return this.http.post<string[]>(this.url, service).pipe(timeout(10000),catchError(err =>{return of(err);}));;
  }

  public view(id: string): Observable<Service> {
    this.url = 'http://' + this.host + this.port + '/service/view/'.concat(id);
    return this.http.get<Service>(this.url).pipe(timeout(10000), catchError(err =>{return of(err);}));;
  }

  public list(): Observable<Service[]> {
    this.url = 'http://' + this.host + this.port + '/service/list';
    return this.http.get<Service[]>(this.url).pipe(timeout(10000), catchError(err =>{return of(err);}));;
  }

}
