const fs = require('fs');
let obj = require("mongoose");
const colors = require('colors');
obj.Promise = global.Promise; // creating the reference. 
let url = "mongodb://localhost:27017/meanstackDB";
const mongooseDbOption = { // to avoid warning 
  useNewUrlParser: true,
  useUnifiedTopology: true
}
obj.connect(url, mongooseDbOption); //ready to connect 
let db = obj.connection; // connected to database. 

let productFILE = fs.readFileSync('call_data.json');
let insertJSON = JSON.parse(productFILE);

db.on("error", (err) => console.log(err));
db.once("open", () => {

  //Defined the Schema 
  let CallRecordSchema = obj.Schema({
    _id: Number,
    source: Number,
    destination: Number,
    sourceLocation: String,
    destinationLocation: String,
    callDuration: String,
    roaming: String,
    callCharge: Number
  });
  // Creating Model using schema 
  let callRecord = obj.model("", CallRecordSchema, "CallRecord");

  callRecord.insertMany(insertJSON, (error, result) => {
    if (!error) {

      console.log(colors.green("Record inserted successfully"));
      //console.log(result)
    } else {
   
	  console.log(colors.red(`Record did not insert ${error}`));
    }
    obj.disconnect(); //close the connectiond..

  })

})