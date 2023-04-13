import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { QuestionComponent } from './question/question.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    QuestionDetailsComponent,
    QuestionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class PostsModule { }
