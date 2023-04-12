import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';
import { Question } from '../models/question.model';
import { BehaviorSubject, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  base_question_url = environment.base_questions;
  base_answer_url = environment.base_answers;

  allQuestion = new BehaviorSubject<any>([]);
  allQuestion$ = this.allQuestion.asObservable();

  question=new BehaviorSubject<Question[]>([])
  question$=this.question.asObservable()

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
      return this.http.post<any>(this.base_question_url, body).pipe(
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


  getQuestion() {
    try {
      return this.http.get<Question[]>(this.base_question_url);

    } catch (error:any) {
      return throwError(() => new Error(error));

    }
  }


  getQuestionById(id: number) {
    try {
      return this.http.get<Question>(this.base_question_url+"/"+id);

    } catch (error:any) {
      return throwError(() => new Error(error));

    }
  }


  getAnswerByQuestionId(id: number) {

    try {
      return this.http.get<Question>(this.base_answer_url+"?question="+id);

    } catch (error:any) {
      return throwError(() => new Error(error));

    }
  }



  postAnswer(body: any) {
    try {
      return this.http.post<any>(this.base_answer_url,body);

    } catch (error:any) {
      return throwError(() => new Error(error));

    }

  }
}
