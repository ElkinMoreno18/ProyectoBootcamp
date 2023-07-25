import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../category-component/category';
import { Observable, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import backend_server_config from '../backend_server_config.json';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  private url: string;
  private host: string = backend_server_config.host;
  private port: string = backend_server_config.port;

  constructor(private http: HttpClient) {
  }

  public save(category: Category): Observable<string[]> {
    this.url = 'http://' + this.host + this.port + '/category/save';
    return this.http.post<string[]>(this.url, category).pipe(timeout(10000), catchError(err => {
      return of(err);
    }));;;
  }

  public view(id: string): Observable<Category> {
    this.url = 'http://' + this.host + this.port + '/category/view/'.concat(id);
    return this.http.get<Category>(this.url).pipe(timeout(10000), catchError(err => {
      return of(err);
    }));;;
  }

  public list(): Observable<Category[]> {
    this.url = 'http://' + this.host + this.port + '/category/list';
    return this.http.get<Category[]>(this.url).pipe(timeout(10000), catchError(err => {
      return of(err);
    }));;;
  }
}
