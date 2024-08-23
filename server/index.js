const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json()); 
app.use(cors()); 

const db = {
  usersInfo: [],
};

app.get("/users", (request, response) => {
  response.send(db);
});

app.get("/user", (request, response) => {
  const userName = request.query.name; 
  const user = db.usersInfo.find(user => user.name === userName);

  if (user) {
    response.status(200).json(user);
  } else {
    response.status(404).send("User not found"); 
  }
});

app.post("/user", (request, response) => {
  const { body } = request;
  db.players.push(body);
  response.status(201).send(body); 
});

app.listen(5050, () => {
  console.log(`Server is running on http://localhost:5050`);
});
