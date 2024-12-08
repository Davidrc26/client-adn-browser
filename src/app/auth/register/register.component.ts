import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { EmailService } from '../../services/email.service';
import { User } from '../../models/all_models';

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
    private emailService: EmailService
  )
  {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
    if (this.registerForm.valid) {
      this.emailService.sendEmail(this.registerForm.value.email).subscribe({
        next: (resp:any) => {
          console.log('Email sent');
          let user : User = {
            ...this.registerForm.value,
            secret: resp.secret
          }
          this.storageService.addUser('users', user);
        },
        error: (error) => {
          console.error('Error sending email', error);
        }
      });
    }
  }
}
