const fs = require("fs");
const user = require("./users")

let employee = {
	"first name": user.firstName,
	"last name": user.lastName,
	"gender": user.gender,
	"email": user.email,
	"datetime": user.datetime
};
let empObj = [];
empObj.push(employee)
debugger;
// read
try {
	var rFile = fs.readFileSync("data.json");
} catch (err) {
	console.log("File can not be read -> creating a new file: " + err);
  debugger;
}
// write 
try {
	if (rFile == '' || rFile == null) {
		fs.writeFileSync("data.json", JSON.stringify(empObj, null, 2));
    debugger;
	} else {
		jsonData = JSON.parse(rFile);
		jsonData.push(employee);
    debugger;
		fs.writeFileSync("data.json", JSON.stringify(jsonData, null, 2));
	}
} catch (err) {
	console.log("File can not be written: " + err);
}