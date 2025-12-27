import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../auth/auth';
import { validate } from '@angular/forms/signals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  authService=inject(Auth);
  router = inject(Router);

  isPasswordVisible = signal<boolean>(false);

  form: FormGroup=new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  })

  onSubmit(){
    this.isPasswordVisible.set(true);
    if (this.form.valid) {
      this.authService.login(this.form.value)
      .subscribe(res => {
        this.router.navigate([''])
      })
    }
  }

}
