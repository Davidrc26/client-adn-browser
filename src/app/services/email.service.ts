import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

const BASE_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    private http: HttpClient
  ) { }

  public sendEmail(email: string): Observable<any> {
    let body = {
      email: email
    }
    return this.http.post(`${BASE_URL}/email`, body);
  }
}
