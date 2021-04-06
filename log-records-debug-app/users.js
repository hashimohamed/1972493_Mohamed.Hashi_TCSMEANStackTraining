var rsData = require("readline-sync");
let firstName = rsData.question("Enter First Name: ");
let lastName = rsData.question("Enter Last Name: ");
let gender = rsData.question("Enter Gender: ");
let email = rsData.question("Enter Email Address: ");

let date = new Date();
let dateFormat = require('dateformat');
let datetime = dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT Z")
module.exports = {
  firstName,
  lastName,
  gender,
  email,
  datetime
};
