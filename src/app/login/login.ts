import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule,FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { Book } from '../book';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login', 
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.html', 
  styleUrl: './login.css'
})
export class Login {
  constructor(private router: Router, private cdr: ChangeDetectorRef, private book:Book) {}
 
  loginFailed = false;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required])
  });

  onSubmit(){
     if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.book.login(this.loginForm.value).subscribe((response) => {
      if (!response.error) {
        this.loginFailed = false;
        this.router.navigate(['home']);
        this.book.islogined.next(true);
      } else {
        this.loginFailed = true;
      }
      this.cdr.detectChanges();
    });
  }
  
}
