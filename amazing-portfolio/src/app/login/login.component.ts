import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginRef = new FormGroup({
userF:new FormControl(),
passF:new FormControl()
});

message: string = "";

constructor(public router: Router) {}

ngOnInit(): void {}

checkUser() {
  let user1 = this.loginRef.get("userF").value;
  let pass1 = this.loginRef.get("passF").value;

  let key = JSON.parse(sessionStorage.getItem("User"));
  console.log("The user", user1);
  console.log("The Session user", key);
  
  if (user1.value == null || pass1.value == null && user1.value == "" || pass1.value == "") {
    this.message = "Username/password not correct";
  }
  if (user1 == key.userForm && pass1 == key.passForm) {
    alert("Login Sucessful");
    console.log("Login successful");
    this.message = "sucess";
    this.router.navigate(["portfolio"]);
  } else {
    this.message = "Please check your username and password";
  }

}

}