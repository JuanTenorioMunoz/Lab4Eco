const express = require("express");
const cors = require("cors");
const http = require('http');
const socketIo = require('socket.io');

const app = express();
app.use(express.json()); // Utility to process JSON in requests
app.use(cors()); // Utility to allow clients to make requests from other hosts or IPs

// Create an HTTP server using the Express app
const server = http.createServer(app);

const db = {
  drivers: [],
  passager: [],
};

// Initialize socket.io on the same server
const io = socketIo(server, {
  cors: { origin: "*" }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);   
  });
});

// Start the server and listen on port 5050
server.listen(5050, () => {
  console.log('Server and socket.io listening on http://localhost:5050');
});
