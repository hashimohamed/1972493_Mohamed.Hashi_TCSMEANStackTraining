let http = require("http");
let url = require("url");
const fs = require("fs");
let port = 9990;
let htmlContent = `
<form style="margin-top: 50px;border: 2px solid blue; width:600px;height:300px;text-align:center;background-color:#F8F8F8;margin-left:auto; margin-right:auto;" action="/store" method="get">
	<h2>Add Task</h2>
	<hr>
		<label>Emp Id:</label>&nbsp; &nbsp; 
		<input style="width:150px;height:30px;" type="text" name="empID"/>
		<br/>
		<label>Task Id:</label>&nbsp; &nbsp; 
		<input style="width:150px;height:30px;" type="text" name="taskID"/>
		<br/>
		<label>Task:</label>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; 
		<input style="width:150px;height:30px;" type="text" name="task"/>
		<br/>
		<label>Deadline:</label>&nbsp;
		<input style="width:150px;height:30px;" type="date" name="date"/>
		<br/>
		<br/>
		<input style="width:70px;height:30px;background-color:blue;color:white;" type="submit" value="Add"/>
		<input style="width:70px;height:30px;background-color:grey;color:white;" type="reset" value="Reset"/>
</form>
<form style="border: 2px solid red; width:600px;height:200px;margin-left:auto; margin-right:auto;text-align:center;" action="/delete" method="get">
		<h2 style="text-align:center;">Delete Task</h2>
		<hr>
		<label>Task Id:</label>
		<input style="width:150px;height:30px;" type="text" name="remTaskID"/>
		<input style="width:70px;height:30px;background-color:red;color:white;" type="submit" value="Delete"/>
</form>
`
var empObj = new Array();
let server = http.createServer((req, res) => {
  var pathInfo = url.parse(req.url, true).pathname;

  if (pathInfo == "/") {
    res.setHeader("content-type", "text/html");
    res.end(htmlContent);

  }

  if (pathInfo == "/store") {
    var data = url.parse(req.url, true).query;
    // console.log(`"EmpId: ${data.empID}, taskID: ${data.taskID}, date: ${data.date}`);

    // convert to object  
    try {
      var rFile = fs.readFileSync("data.json");
    } catch (err) {
      console.log("File can not be read -> creating a new file: " + err);
    }
    // store using fs module
    try {
      if (rFile == '' || rFile == null) {
        fs.writeFileSync("data.json", JSON.stringify(empObj, null, 2));
        //converet to string 
      } else {
        var jsonData = JSON.parse(rFile);
        // store records in object using PUSH method 
        jsonData.push(data);
        fs.writeFileSync("data.json", JSON.stringify(jsonData, null, 2));
      }
    } catch (err) {
      console.log("File can not be written: " + err);
    }
    res.writeHead(301, {
      location: '/display'
    });
    res.end();
  } else if (req.url == "/display") {
    var rFile = fs.readFileSync("data.json");
    let jParse = JSON.parse(rFile);
    // console.log(jParse);

    var tableDatavariable = `
        <table style="margin-top: 50px;width:70%;margin-left:auto; margin-right:auto;" border ="1">
        <tr>
            <th style="padding: 15px;background-color:gray;">Emp ID</th>
            <th style="padding: 15px;background-color:gray;">Task ID</th>
            <th style="padding: 15px;background-color:gray;">Task</th>
            <th style="padding: 15px;background-color:gray;">Date</th>
        </tr>
        `
    for (let i = 0; i < jParse.length; i++) {
      var element = jParse[i];

      tableDatavariable += `
            <tr>
                <td style="padding: 15px;background-color:#F8F8F8;color:blue;font-size:20px;">${element.empID}</td>
                <td style="padding: 15px;background-color:#F8F8F8;color:blue;font-size:20px;">${element.taskID}</td>
                <td style="padding: 15px;background-color:#F8F8F8;color:blue;font-size:20px;">${element.task}</td>
                <td style="padding: 15px;background-color:#F8F8F8;color:blue;font-size:20px;">${element.date}</td>
            </tr>
            
        `
    }
    tableDatavariable += `</table><input style="width:80px;height:40px;background-color:red;color:white;margin-left:260px;" type="button" value="Go Back" onclick="history.back(-1)" />`
    res.end(tableDatavariable);
  } else if (pathInfo == "/delete") {
    var rFile = fs.readFileSync("data.json");
    var deleteTaskID = url.parse(req.url, true).query;

    res.setHeader("content-type", "text/html");
    // console.log("Test delete task id: " + deleteTaskID.taskID)
    var jParse2 = JSON.parse(rFile);
    // console.log(jParse2);

    for (var i = 0; i < jParse2.length; i++) {
      var element = jParse2[i];
      // console.log("testing element taskid: " + element.taskID);
      if (element.taskID === deleteTaskID.remTaskID) {
        jParse2.splice(i, 1);

      }

    }
    fs.writeFileSync("data.json", JSON.stringify(jParse2, null, 2));
    res.writeHead(301, {
      location: '/display'
    });
    res.end();

  }
})
server.listen(port, () => console.log(`The server is running on port: ${port}`));