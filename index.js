var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var operations = [];

app.use(express.static("client/build"));

app.get("/initialOp", function(req, res) {
  console.log("inside initialOp");
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(JSON.stringify(operations));
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/client/build/index.html");
});

io.on("connection", function(socket) {
  console.log("a user connected");

  socket.on("operation", function(msg) {
    if (operations.length === 10) {
      operations.shift();
    }
    operations.push(msg);
    socket.broadcast.emit("operation", msg);
  });
});

http.listen(4000, function() {
  console.log("listening on *:4000");
});
