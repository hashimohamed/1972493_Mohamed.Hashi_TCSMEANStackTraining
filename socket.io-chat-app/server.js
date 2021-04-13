let app = require("express")();
let http = require("http").Server(app); // to load the library we have run port number using hhtp module 
let io = require("socket.io")(http);
const colors = require('colors');
port = 9050;
var numberOfClients = 0;

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});
io.on("connection", (socket) => {
	socket.on("chat", (msg) => {
		console.log(colors.green(`${msg}`));
	});
	numberOfClients++;
	socket.emit('connected', {
		numberOfClients: numberOfClients
	});
	console.log(colors.red(`A user connected`));
	console.log('Number Clients Connected:', numberOfClients);
});
http.listen(port, () => console.log(`Server running on port number: ${port}`));