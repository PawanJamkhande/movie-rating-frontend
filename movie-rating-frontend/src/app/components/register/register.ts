import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  registerForm: FormGroup;
  loading = false;
/*
I use Angular's Dependency Injection to obtain a FormBuilder instance.
Instead of manually creating it with new, Angular provides a configured instance through the constructor
The private access modifier limits its usage to the component itself.
*/
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    /*
    I used Angular Reactive Forms. The FormBuilder creates a FormGroup which contains multiple FormControl objects. 
    Each control represents one input field. Validators are attached to each control to ensure the data is valid before the form is submitted.
    */
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['USER', [Validators.required]]
    });
  }

  /*
  The Register button has type='submit', so clicking it submits the form. 
  Since the form uses Angular's (ngSubmit) event binding, Angular automatically invokes the onSubmit() method inside the component.
  */
  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.snackBar.open('Registered successfully. Please login.', 'Close', { duration: 3000 });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.message || 'Registration failed', 'Close', { duration: 3000 });
      }
    });
  }

}
