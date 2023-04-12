import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { SignUp } from '../models/signUp.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BehaviorSubject, tap, throwError } from 'rxjs';
import { Login} from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {

    if (sessionStorage.getItem('token')){
      this.isLogin.next(true)
    }
  }

  isLogin = new BehaviorSubject<boolean>(false);
  isLogin$ = this.isLogin.asObservable();
  base_url = environment.base_user;

  signUp(body: SignUp) {
    try {
      return this.http.post<SignUp>(this.base_url, body).pipe(
        tap(() => {
          this.toastr.success(
            'You have successfully signed up!',
            'Sign-Up Successful'
          );
        })
      );
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  login(body: Login) {

    try {
      return this.http.get<any>(this.base_url+ '?email=' + body.email);
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  logOut() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    this.isLogin.next(false);
  }
}
