import { Injectable } from '@angular/core';
import { Quiz } from './quiz';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class OnlineQuizService {
	userRef = new FormGroup({
		userF: new FormControl(),
		passf: new FormControl()
	});
	IsHidden = true;
	constructor(public http: HttpClient) {}
	getQuizzes(): Observable < Quiz[] > {
		return this.http.get < Quiz[] > ("/assets/data.json");
	}
	toggleDisplay() {
		this.IsHidden = false;
		console.log("triggered" + this.IsHidden)
	}
}