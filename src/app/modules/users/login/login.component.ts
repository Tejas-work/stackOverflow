import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/shared/models/login.model';
import { SignUp } from 'src/app/shared/models/signUp.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private usersService: UsersService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  login() {
    const body: Login = {
      email: this.email?.value,
      password: '',
    };
    this.usersService.login(body).subscribe({
      next: (res) => {
        console.log(res);
        console.log(res.length < 0);
        let user;
        if (res.length == 0) {
          this.email?.setErrors({ message: 'please enter valid email' });
        } else {
          console.log('inside');
          user = res.find(
            (user: SignUp) => user.password == this.password?.value
          );
          console.log(user);

          if (user) {
            sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('token', JSON.stringify(user.id));
            this.usersService.isLogin.next(true);
            this.loginForm.reset();
            this.router.navigate(['']);
          } else {
            this.password?.setErrors({
              invalidPassword: 'Please enter a valid password',
            });
          }
        }
      },
    });
  }
}
