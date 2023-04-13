import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';
import { Question, QuestionRes } from '../models/question.model';
import { BehaviorSubject, tap, throwError } from 'rxjs';
import { AnswersRes } from '../models/answers.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  base_question_url = environment.base_questions;
  base_answer_url = environment.base_answers;

  //all Questions
  allQuestion = new BehaviorSubject<QuestionRes[]>([]);
  allQuestion$ = this.allQuestion.asObservable();


  userQuestion=new BehaviorSubject<Question[]>([])
  userQuestion$=this.userQuestion.asObservable()

  constructor(private http: HttpClient,
    private toastr: ToastrService,
    private router: Router) {

      this.getQuestion().subscribe(
        {
          next: (res) => {
            console.log(res);
            this.allQuestion.next(res);
          },
          error: (error) => console.log(error),
        }
      )
     }


  postQuestion(body: Question) {

    try {
      return this.http.post<QuestionRes>(this.base_question_url, body).pipe(
        tap((res) =>
        {
          let items = this.allQuestion.getValue();
          items.push(res);
          this.allQuestion.next(items);
          }
        )
      );

    } catch (error:any) {
      return throwError(()=>new Error(error))

    }
  }


  usersAskQuestions(id:number) {
    try {
      return this.http.get<any>(this.base_question_url + "?user_id=" + id).pipe(
        tap((res) => console.log(this.base_question_url + "?user_id=" + id)

        )
      );

    } catch (error:any) {
      return throwError(() => new Error(error));

    }

  }
  usersAnswers(id:number) {
    try {
      return this.http.get<any>(this.base_answer_url+"?answer_user_id="+id);

    } catch (error:any) {
      return throwError(() => new Error(error));

    }

  }

  getQuestion() {
    try {
      return this.http.get<QuestionRes[]>(this.base_question_url);

    } catch (error:any) {
      return throwError(() => new Error(error));

    }
  }


  getQuestionById(id: number) {
    try {
      return this.http.get<QuestionRes>(this.base_question_url+"/"+id);

    } catch (error:any) {
      return throwError(() => new Error(error));

    }
  }


  getAnswerByQuestionId(id: number) {

    try {
      return this.http.get<AnswersRes[]>(this.base_answer_url+"?question="+id);

    } catch (error:any) {
      return throwError(() => new Error(error));

    }
  }

  updateAnswer(ans: AnswersRes) {

    try {
      return this.http.put<AnswersRes>(this.base_answer_url+"/"+ans.id,ans);

    } catch (error:any) {
      return throwError(() => new Error(error));

    }



  }



  postAnswer(body: any) {
    try {
      return this.http.post<AnswersRes>(this.base_answer_url,body);

    } catch (error:any) {
      return throwError(() => new Error(error));

    }

  }

  deleteAnswer(id: number) {
    try {
      return this.http.delete<any>(this.base_answer_url+"/"+id);

    } catch (error:any) {
      return throwError(() => new Error(error));

    }

  }
}
