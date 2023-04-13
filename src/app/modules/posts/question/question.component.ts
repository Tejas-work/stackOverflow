import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Question } from 'src/app/shared/models/question.model';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent {
  questionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postService: PostsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      details: ['', [Validators.required, Validators.minLength(20)]],
      expecting: ['', [Validators.required, Validators.minLength(20)]],
      tag: ['', Validators.required],
    });
  }

  get question() {
    return this.questionForm.get('question');
  }
  get details() {
    return this.questionForm.get('details');
  }
  get expecting() {
    return this.questionForm.get('expecting');
  }
  get tag() {
    return this.questionForm.get('tag');
  }

  post() {
    let id = sessionStorage.getItem('id') || '0';
    let user = sessionStorage.getItem('user');
    let user_name = '';
    if (user) {
      let userObj = JSON.parse(user);
      user_name = userObj.displayName;

      let date = new Date();
      const body: Question = {
        user_id: userObj.id,
        question: this.question?.value,
        details: this.details?.value,
        expecting: this.expecting?.value,
        tag: this.tag?.value,
        created: date,
        view: 0,
        user_name: user_name,
        votes: 0,
        answer: 0
      };

      this.postService.postQuestion(body).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['']);
        },
        error: (error) => console.log(error),
      });
    }
  }


}
