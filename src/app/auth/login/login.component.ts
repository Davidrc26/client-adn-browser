import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/all_models';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent implements OnInit { 
  
  public loginForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private storageService: StorageService
  )

  {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  login(): void {
    if (this.loginForm.valid) {
      let users : User[] = this.storageService.getUsers('users');
      let user = users.find(user => user.email === this.loginForm.value.email && user.secret === this.loginForm.value.code);
      if (user) {
        console.log('User logged in');
      } else {
        console.error('Invalid email or code');
      }
    }
  }
}
