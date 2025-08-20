import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z]*$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.router.navigate(['/login']);
    }
  }
}