import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/users/login/login.component';
import { SignUpComponent } from './modules/users/sign-up/sign-up.component';
import { HomeComponent } from './shared/components/home/home.component';
import { QuestionComponent } from './modules/posts/question/question.component';
import { QuestionDetailsComponent } from './modules/posts/question-details/question-details.component';

const routes: Routes = [
  {
    path: '',
    component:HomeComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'signup',
    component:SignUpComponent
  },
  {
    path: 'question',
    component:QuestionComponent
  }, {
    path: 'details/:id',
    component:QuestionDetailsComponent
  }
  // {
  //   path:'users',loadChildren:()=>import('../app/modules/users/users.module').then(c => c.UsersModule)

  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
