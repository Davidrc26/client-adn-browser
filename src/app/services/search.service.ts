import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
const BASE_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})


export class SearchService {
  
  constructor(
    private http: HttpClient
  ) { }

  public search(filename?: string, search?: string, page: number = 1, size: number =100): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (filename) {
      params = params.set('filename', filename);
    }

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<any>(`${BASE_URL}/query`, { params });
  }
}
