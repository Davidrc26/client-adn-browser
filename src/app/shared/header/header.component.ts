import { Component, inject } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  currentUser = localStorage.getItem('currentUser');

  constructor(private storageService: StorageService) {}

  logout() {
    this.storageService.logOut();
  }
}
