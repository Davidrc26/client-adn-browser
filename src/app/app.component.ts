import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'client-adn-browser';
  isLoginOrRegister: boolean = false;

  constructor(
    private router: Router, 
  ) {}
  
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const url = this.router.url;
      this.isLoginOrRegister = url.includes('login') || url.includes('register');
    });
  }

}
