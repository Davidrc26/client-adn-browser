import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }


  
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
}
