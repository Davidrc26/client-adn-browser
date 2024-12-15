import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { EmailService } from '../../services/email.service';
import { User } from '../../models/all_models';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export default class RegisterComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private emailService: EmailService,
    private alertService: AlertService,
    private router: Router
  )
  {}

  ngOnInit(): void {
    this.buildForm();
  }
  public registerForm!: FormGroup;

  buildForm(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  register(): void {
    if (this.registerForm.valid && !this.existsUser(this.registerForm.value.email)) {
      this.emailService.sendEmail(this.registerForm.value.email).subscribe({
        next: (resp:any) => {
          this.alertService.showInformationDialog('Otp login code has been sent by email.');
          let user : User = {
            ...this.registerForm.value,
            secret: resp.otp
          }
          
          this.storageService.addUser('users', user);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.alertService.showErrorDialog('Error sending email');
        }
      });
    }
  }

  existsUser(email: string): boolean {
    let users = this.storageService.getUsers('users');
    let existsUser = users.some((user: User) => user.email === email);
    existsUser? this.alertService.showErrorDialog('User already exists') : null;
    return existsUser;
  }
}
