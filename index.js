var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.static("client/build"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/client/build/index.html");
});

io.on("connection", function(socket) {
  console.log("a user connected");

  socket.on("operation", function(msg) {
    socket.broadcast.emit("operation", msg);
  });
});

http.listen(4000, function() {
  console.log("listening on *:3000");
});
