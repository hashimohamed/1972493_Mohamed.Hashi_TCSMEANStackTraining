import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlineQuizComponent } from './online-quiz/online-quiz.component';

const routes: Routes = [
  { path: "\quiz-page", component: OnlineQuizComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
