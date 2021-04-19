let express = require("express");
let app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let bodyParser = require("body-parser");
let Mongoose = require("mongoose");
let url ="mongodb://localhost:27017/meanstackDB";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
port = 9800;
 
Mongoose.Promise= global.Promise;
let mongodbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
Mongoose.connect(url,mongodbOptions)
let messageSchema = Mongoose.Schema({
	// _id:Number,
	name: String,
	message: String, created: {type: Date, default: Date.now}
})
let Message = Mongoose.model("",messageSchema,"Chat");
app.get("/", (req, res) => {
  Message.find({}, (err, messages) => {
	res.sendFile(__dirname + "/index.html");
    //res.send(messages);
  });
});
app.post("/messages", async (req, res) => {
  var message = new Message(req.body);
  await message.save().then((result) => {
    if(result){
      console.log("Message stored successfully");
      io.emit("message", req.body);
      res.send(message);
    } else {
     res.send("Message not saved")
    }
  });
});
app.listen(port, () => console.log(`Server is running on port: ${port}`));