import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUp } from 'src/app/shared/models/signUp.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder,private http: HttpClient, private usersService:UsersService, private router: Router) {
    this.signUpForm = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get displayName() {
    return this.signUpForm.get('displayName');
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get password() {
    return this.signUpForm.get('password');
  }

  signUp() {
    const body:SignUp = {
      displayName: this.displayName?.value,
      email: this.email?.value,
      password: this.password?.value
    }

    this.usersService.signUp(body).subscribe(
      {
        next: (res) => {
          this.router.navigate(['login']);
        },error:(error)=>console.log(error)

      }
    )

  }
}
