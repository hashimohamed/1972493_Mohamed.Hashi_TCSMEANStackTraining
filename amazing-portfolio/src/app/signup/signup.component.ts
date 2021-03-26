import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
signupRef = new FormGroup({
fname: new FormControl(),
lname: new FormControl(),
userForm: new FormControl(),
passForm: new FormControl()

});
msgReg:string="";

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  checkUserRegistration(){
    let userForm=this.signupRef.get("userForm").value;
    let passForm=this.signupRef.get("passForm").value;
    let fname=this.signupRef.get("fname").value;
    let lname=this.signupRef.get("lname").value;
    
    if (userForm.value == "" || passForm.value == " " || fname.value == "" || lname.value =="") {
      this.msgReg= "Please fill out the form";
    } else {
      alert ("Successful Registration");
      this.router.navigate(["login"]);
    }
  const user={
          userForm:userForm,
          passForm:passForm
   }
    sessionStorage.setItem("User", JSON.stringify(user));

  }

}
