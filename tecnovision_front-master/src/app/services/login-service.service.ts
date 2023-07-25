import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import backend_server_config from '../backend_server_config.json';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private url: string;
  private host: string = backend_server_config.host;
  private port: string = backend_server_config.port;

  constructor(private http: HttpClient) {
  }

  public checkLogin(object: string, userType: string): Observable<string[]> {
    this.url = 'http://' + this.host + this.port + '/login/check/'.concat(userType);
    return this.http.get<string[]>(this.url, {
      params: {
        person: object
      }
    }).pipe(timeout(3000), catchError(err => {
      return of(err);
    }));
  }

}