import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component')
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component')
  },
  {
    path: 'browser',
    loadComponent: () => import('./browser/browser.component'),
  }
];
