const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

var allClients = [];

io.on("connection", socket => {
  allClients.push(socket);

  socket.on("new message", message => {
    console.log(message);
    socket.broadcast.emit("new message", message);
  });

  socket.on("connected", data => console.log(data, socket.id));

  socket.on("error", err => {
    console.log("recievederror from client: ", socket.id);
    console.log(err);
  });
  socket.on("disconnect", () => {
    console.log("client disconnected...", socket.id);
  });
  console.log("connected..." + socket.id);
  socket.emit("register", socket.id);
});

server.listen(port, () => console.log(`Listening on port ${port}`));
