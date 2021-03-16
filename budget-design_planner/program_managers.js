// #1 Store in session
var empObj = [];

function storeInSession() {
  console.log(empObj);
  sessionStorage.setItem("empInfo", JSON.stringify(empObj))
  console.log(empObj)
  var test = ["value1", "value2"];
  sessionStorage.setItem("Items", test);
}

function retrieveFromSession() {

  var empObj2 = sessionStorage.getItem("empInfo");
  var myJSON = JSON.parse(sessionStorage.getItem("empInfo"));

  document.write("<br/>")
  document.write("Emp object in string format<br/>")
  document.write("<br/>Client Name: is " + myJSON[0].clientName)
  document.write("<br/>Project Name: is " + myJSON[0].projectName)
  document.write("<br/>Budget Name: is " + myJSON[0].budgetName)
  console.log(myJSON)
  console.log(myJSON.clientName);

}

function onFormSubmit() {

  var data = readFormData();
  insertNewRecord(data);
  empObj.push(data);
  resetData();

}
function onFormSubmitFinance() {

  var data = readFormData();
  if (sessionStorage.getItem("empInfo") != null) {
    empObj = JSON.parse(sessionStorage.getItem("empInfo"))
  }
  empObj.push(data);

  sessionStorage.setItem("empInfo", JSON.stringify(empObj))
  resetData();
}

function readFormData() {
  var obj = {}
  obj.clientName = document.getElementById("clientName").value;
  obj.projectName = document.getElementById("projectName").value;
  obj.budgetName = document.getElementById("budgetName").value;
  console.log(obj);
  return obj;
}

function insertNewRecord(data) {
  var table = document.getElementById("financeList")
  var body = table.getElementsByTagName("tbody")[0];
  var newRow = body.insertRow(body.length);

  var cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.clientName;

  var cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.projectName;

  var cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.budgetName;
}

function retrieveFromSessionFinance() {
  var data = JSON.parse(sessionStorage.getItem("empInfo"));
  var table = document.getElementById("financeList")
  var body = table.getElementsByTagName("tbody")[0];

  var arrayLength = 0;
  if (data != null)
    arrayLength = data.length;
  var total = 0.0;
  for (var i = 0; i < arrayLength; i++) {
    var newRow = body.insertRow(body.length); // row created 

    console.log(data[i].clientName);

    var cell1 = newRow.insertCell(0); // cell created 
    cell1.innerHTML = data[i].clientName;

    var cell2 = newRow.insertCell(1); // cell created 
    cell2.innerHTML = data[i].projectName;

    var cell3 = newRow.insertCell(2); // cell created 
    cell3.innerHTML = data[i].budgetName;

    //Do something
    total = parseInt(total) + parseInt(data[i].budgetName);
  }
  var newRow = body.insertRow(body.length);
  var cell1 = newRow.insertCell(0); // cell created 
  cell1.innerHTML = "";

  var cell2 = newRow.insertCell(1); // cell created 
  cell2.innerHTML = "";

  var cell3 = newRow.insertCell(2); // cell created 
  cell3.innerHTML = total;

  if (total >= 1) {
    cell3.innerHTML = total;

  }
}

function resetData() {
  document.getElementById("clientName").value = "";
  document.getElementById("projectName").value = "";
  document.getElementById("budgetName").value = "";
}