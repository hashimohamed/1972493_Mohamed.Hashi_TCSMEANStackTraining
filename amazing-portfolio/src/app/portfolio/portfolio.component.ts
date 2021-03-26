import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
	userFormRef: FormGroup
	displayData: any;
	constructor(private formBuild: FormBuilder) {
		this.displayData = [];
		this.userFormRef = this.formBuild.group({
			name: [''],
			phone: ['']
		})
	}

	public saveUserDetails(): void {
		this.displayData.push(this.userFormRef.value)

	}

	ngOnInit(): void {}

}

