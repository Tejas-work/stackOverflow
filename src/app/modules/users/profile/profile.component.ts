import { Component } from '@angular/core';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  ie = 0;
  questionCount = 0;
  answersCount = 0;
  constructor(private postService: PostsService) {}

  ngOnInit() {
    let user = sessionStorage.getItem('token');
    if (user) {
      let id = JSON.parse(user);

      this.getQuestion(id);
      this.getAnswers(id);
    }
  }
  getQuestion(id: number) {
    this.postService.usersAskQuestions(id).subscribe({
      next: (res) => {
        this.questionCount = res.length;
        console.log(res);
      },
      error: (error) => console.log(error),
    });
  }
  getAnswers(id: number) {
    this.postService.usersAnswers(id).subscribe({
      next: (res) => {
        this.answersCount = res.length;
        console.log(res);
      },
      error: (error) => console.log(error),
    });
  }
}
