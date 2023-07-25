import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Injectable } from '@angular/core';
import { City } from '../extras/city';
import backend_server_config from '../backend_server_config.json';

@Injectable({
  providedIn: 'root'
})
export class CityServiceService {

  private url: string;
  private host: string = backend_server_config.host;
  private port: string = backend_server_config.port;

  constructor(private http: HttpClient) {
  }

  public list(): Observable<City[]>{
    this.url = 'http://' + this.host + this.port + '/city/list';
    return this.http.get<City[]>(this.url);
  }
  
}
