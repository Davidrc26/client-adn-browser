import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    private http: HttpClient
  ) { }

  public sendEmail(email: string): Observable<any> {
    return this.http.post('https://api.sendgrid.com/v3/mail/send', {
      email,
    });
  }
}
