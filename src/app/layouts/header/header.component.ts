import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from 'src/app/shared/models/signUp.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  home() {
  this.router.navigate([''])
;
}

  isLogin: boolean = false
  userName: string = '';
  constructor(private usersService:UsersService,private router:Router) {

  }

  ngOnInit() {


    this.usersService.isLogin$.subscribe(
      {
        next: (res) => {
          this.isLogin = res

          let user = sessionStorage.getItem('user');

          if (user) {
            let userObj:SignUp= JSON.parse(user);
            this.userName=userObj?.displayName
          }


        }
        , error: (error) => {
          console.log(error);

        }
      }
    )

  }


  logOut() {
    this.usersService.logOut();
  }
}
