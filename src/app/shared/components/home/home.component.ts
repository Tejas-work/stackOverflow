import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Question, QuestionRes } from '../../models/question.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
questionDetails(id: number|undefined) {
  this.router.navigate(['details', id]);

}

  allQuestion:QuestionRes[] = [];


  constructor(private postService:PostsService,private router:Router) {

  }


  ngOnInit() {

    this.postService.allQuestion$.subscribe(
      {
        next: (res) => {
          console.log(res);
          this.allQuestion=res
        },
        error: (error) => console.log(error),
      }
    )

  }

}
