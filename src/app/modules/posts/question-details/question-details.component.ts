import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Answers } from 'src/app/shared/models/answers.model';
import { Question, QuestionRes } from 'src/app/shared/models/question.model';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css'],
})
export class QuestionDetailsComponent {
  id: number = -1;
  question: QuestionRes | undefined;
  answerForm!: FormGroup;
  answers: any;

  constructor(
    private postService: PostsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
    route.params.subscribe((res) => {
      this.id = res['id'];
      this.getQuestion(this.id);
    });
  }

  ngOnInit() {
    this.answerForm = this.fb.group({
      answer: [''],
    });

    this.getQuestionAnswers();
  }
  get answer() {
    return this.answerForm.get('answer');
  }

  getQuestionAnswers() {
    this.postService.getAnswerByQuestionId(this.id).subscribe({
      next: (res) => {
        this.answers = res;
        console.log(res);
      },
      error: (error) => console.log(error),
    });
  }
  getQuestion(id: number) {
    this.postService.getQuestionById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.question = res;
      },
      error: (error) => console.log(error),
    });
  }

  editAnswer(ans: any) {
    this.answer?.setValue(ans.answer);
  }




  postAnswer() {
    let user = sessionStorage.getItem('user');

    if (user) {
      let userObj = JSON.parse(user);
      let userName = userObj.displayName;
      let id = userObj.id;
      if (id && this.question) {
        const body: Answers = {
          answer_user_id: id,
          question_id: this.question.id,
          question_user_id: this.question.user_id,
          answer: this.answer?.value,
          vote: 0,
          created: new Date(),
          answer_user_name: userName,
        };

        this.postService.postAnswer(body).subscribe({
          next: (res) => {
            console.log(res);
            this.getQuestionAnswers();
          },
          error: (error) => console.log(error),
        });
      }
    }
  }

  deleteAnswer(id: number) {
    this.postService.deleteAnswer(id).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.toastr.success("deleted successfully!")
        },
        error: (error) => console.log(error),

      }
    )
  }


}
