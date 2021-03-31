import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from './task-tracker/user';

@Injectable({
  providedIn: 'root'
})
export class TaskTrackerService {

  constructor(public http: HttpClient) {}

  storeTask(tTraker: any) {
    this.http.post("http://localhost:3000/task", tTraker).subscribe(result => console.log(result), error => console.error(error));

  }
  //   getData(): Observable < [] > {
  // 		return this.http.get < [] > ("http://localhost:3000/to_do_task");// }
  url: string = "http://localhost:3000/task/"
  getUsers() {
    return this.http.get < Users[] > (this.url);
  }

  public deletePost() {
    this.http.delete(this.url).subscribe(data => {
      console.log(data);
    });
  }

}