import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AnswerComponent } from './answer/answer.component';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [LoginComponent, SignUpComponent, DashboardComponent, AnswerComponent, ProfileComponent],
  imports: [CommonModule,ReactiveFormsModule,UserRoutingModule],
  exports: [LoginComponent, SignUpComponent,ProfileComponent],
})
export class UsersModule {}
