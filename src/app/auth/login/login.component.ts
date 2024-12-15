import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/all_models';
import { StorageService } from '../../services/storage.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

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
    private storageService: StorageService,
    private alertService: AlertService,
    private router: Router
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
      console.log(users);
      let user = users.find(user => user.email === this.loginForm.value.email && user.secret === this.loginForm.value.code);
      if (user) {
        this.alertService.showInformationDialog('Login successful');
        this.storageService.setCurrentUser(user.email);
        this.router.navigate(['/browser']);
      } else {
        this.alertService.showErrorDialog('Invalid email or code');
      }
    }else{
      this.alertService.showErrorDialog('Invalid form');
    }
  }
}
