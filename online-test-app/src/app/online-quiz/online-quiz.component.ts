import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
// import { runInThisContext } from 'node:vm';
import { OnlineQuizService } from './online-quiz.service';
import { Quiz } from './quiz';

@Component({
  selector: 'app-online-guiz',
  templateUrl: './online-quiz.component.html',
  styleUrls: ['./online-quiz.component.css']
})
export class OnlineQuizComponent implements OnInit {
  userRef;

  quizzes: Quiz[] = [];
  answerQuestion: Array<string> =[];
  currentQuiz= 0;
  correctAnswer=0;
  wrongAnswer=0;
  showResult: boolean;
  percentage: number;
  pass_fail:boolean;
  currentAnswerSubmited:boolean;

  constructor(public router: Router, private quizSer: OnlineQuizService) {
    this.userRef = new FormGroup({
      userF: new FormControl(),
      passf: new FormControl()
    });
  }
  ngOnInit(): void {
    this.quizSer.getQuizzes().subscribe(result => this.quizzes = result, error => console.log(error))
    this.showResult = false;
    // this.router.navigate(["quiz-page"]);
  }
  selectAnswer(option: boolean, answer: string, answerIndex: number) {
    this.currentAnswerSubmited = true;
    if(option) {
      this.correctAnswer++;
    } else {
      this.wrongAnswer++;
    }
    this.answerQuestion.push(answer);
  }
  submitAnswer(formData) {
    if(this.currentAnswerSubmited) {
      this.percentage = (this.correctAnswer * 100) / 10;
      this.currentQuiz++;
      if(this.percentage >= 70) {
        this.pass_fail = true;
        console.log("Passed" + this.pass_fail);
      } else {
        this.pass_fail = false;
        console.log("failed" + this.pass_fail);
      }
      if(this.currentQuiz >= 10) {
        this.showResult = true;
      }
      this.currentAnswerSubmited = false;
    }
  }
  refresh(): void {
    window.location.reload();
  }
  }
  