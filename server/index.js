const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express(); // Creates HTTP server
app.use(express.json()); // utility to process JSON in requests
app.use(cors()); // utility to allow clients to make requests from other hosts or ips

const httpServer = createServer(app); // Explicity creates an HTTP server from the Express app

const io = new Server(httpServer, {
  path: "/real-time",
  cors: {
    origin: "*", // Allow requests from any origin
  },
}); // Creates a WebSocket server, using the same HTTP server as the Express app and listening on the /real-time path

const db = {
  drivers: [],
  passangers: []
};

io.on("connection", (socket) => {

  socket.on("addUserNameDriver", (user) => {
    db.players.push(user);
    console.log(user);
    io.emit("userJoined", db); 
  });

  // implement "startGame" listener

  // implement "notifyMarco" listener

  // implement "notifyPolo" listener

  // implement "onSelectPolo" listener
});

httpServer.listen(5050, () => {
  console.log(`Server is running on http://localhost:${5050}`);
});