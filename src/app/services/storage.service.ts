import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private router: Router
  ) { }


  
  public setUsers(key: string, value: any[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Método para obtener un array desde localStorage
  public getUsers(key: string): any[] {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : [];
  }


  public addUser(key: string, user: any): void {
    const array = this.getUsers(key);
    array.push(user);
    this.setUsers(key, array);
  }

  public setCurrentUser(email:any): void {
    localStorage.setItem('currentUser', email);
  }

  public logOut(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
