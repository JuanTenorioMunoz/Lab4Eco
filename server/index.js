const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.json());
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  path: "/real-time",
  cors: {
    origin: "*",
  },
});

const db = {
  drivers: [],
  passengers: []
};

io.on("connection", (socket) => {

  socket.on("addUserNameDriver", (user) => {
    db.drivers.push({ userName: user });
    console.log(user);
    io.emit("driverJoined", db);
  });

  socket.on("addUserNamePassenger", (user) => {
    db.passengers.push(user);
    console.log(user);
    io.emit("passengerJoined", db);
  });

  socket.on("addVehicleToRoster", (user, vehicle) => {
    const driver = db.drivers.find((driver) => driver.userName === user);
    
    if (driver) {
      if (!driver.vehicles) {
        driver.vehicles = [];
      }
      driver.vehicles.push(vehicle);
      io.emit("displayVehicle", vehicle);
    } else {
      console.log("Driver not found");
    }
  });

  socket.on("displayVehicle", (vehicleName) => {

    const vehContainer = document.getElementById("vehicle-container");
    if (!vehContainer) {
      const vehContainer = document.createElement("div");
      vehContainer.id = "vehicle-container";
      document.body.appendChild(vehContainer);
    }
    document.getElementById("vehicle-container").innerHTML += `<p>${vehicleName}</p>`;
  });

  // implement "startGame" listener

  // implement "notifyMarco" listener

  // implement "notifyPolo" listener

  // implement "onSelectPolo" listener
});

// Routes to interact with the db

// Get the current data from db
app.get("/db", (req, res) => {
  res.json(db);
});


app.post("/add-driver", (req, res) => {
  const driver = req.body;
  if (driver) {
    db.drivers.push(driver);
    io.emit("driverJoined", db);  
    res.status(201).json({ message: "Driver added", driver });
  } else {
    res.status(400).json({ message: "Invalid driver data" });
  }
});

app.post("/add-passenger", (req, res) => {
  const passenger = req.body;
  if (passenger) {
    db.passengers.push(passenger);
    io.emit("passengerJoined", db); 
    res.status(201).json({ message: "Passenger added", passenger });
  } else {
    res.status(400).json({ message: "Invalid passenger data" });
  }
});

httpServer.listen(5050, () => {
  console.log(`Server is running on http://localhost:5050`);
});
