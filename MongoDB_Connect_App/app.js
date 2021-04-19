let app = require("express")();
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
let url = "mongodb://localhost:27017";
let Mongoose = require("mongoose"); 
port = 9700;
Mongoose.Promise= global.Promise;
let MongoClient = require('mongodb').MongoClient;
let mongodbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
Mongoose.connect("mongodb://localhost:27017/meanstackDB",mongodbOptions);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.get("/fetch", (req, res) => {
    MongoClient.connect(url, {useUnifiedTopology: true },(err, client)=> {
        if (err) throw err;
        var dbo = client.db("meanstackDB");
        dbo.collection("Courses").find({}).toArray((err, result)=> {
            if(!err){
                res.send(result)
            } else{
                res.end();
            }
        });

      });
});

MongoClient.connect(url, {useUnifiedTopology: true },(err1,client)=>{
var db = client.db("meanstackDB");
app.get("/add",(req,res)=>{
    res.sendFile(__dirname+"/add.html");
});
app.post('/add_course', (req, res) => {
    if(!err1){
        db.collection("Courses").insertOne(req.body,(err2,result)=>{
            if(!err2){
                res.send("Inserted Successfully");
                
            }else {
                res.send("Insert Failed");
            }
        });
    }
});
});

app.get("/update",(req,res)=>{
    res.sendFile(__dirname+"/update.html");
})
app.post('/update_course', (req, res) => {
    MongoClient.connect(url, {useUnifiedTopology: true },(err1,client)=>{
        if(!err1){
                    let db = client.db("meanstackDB");
            db.collection("Courses").updateOne({_id:req.body._id},{$set:{amount:req.body.amount}},(err2,result)=>{
                if(!err2){
                    if(result.modifiedCount>0){
                            res.send("Record updated succesfully")
                    }else {
                            res.send("Record is not present");
                    }
                }else {
                    res.send("Error "+err2);
                }
                    client.close();    
                });
                
            }
        });
  })

MongoClient.connect(url,{ useUnifiedTopology: true },(err1,client)=>{
    app.get("/delete", (req, res) => {
        res.sendFile(__dirname + "/delete.html");
    });
    app.post("/delete_course", (req, res) => {
        if(!err1) {
            var db = client.db("meanstackDB");
            db.collection("Courses").deleteOne({_id:req.body._id},(err2,result)=>{
                if(!err2){
                    if(result.deletedCount>0){
                        res.send("Record deleted successfully")
                    }else {
                        res.send("Record did not deleted")
                    }
                }
                res.end();
            });
        }
    });
});

app.listen(port, () => console.log(`Server is running on port: ${port}`));