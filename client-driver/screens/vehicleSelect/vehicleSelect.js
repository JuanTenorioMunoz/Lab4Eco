let socket = io("http://localhost:5050", { path: "/real-time" });

const input = document.getElementById("input")
const addVehicleButton = document.getElementById("addVehicle")
const username = localStorage.getItem('username');
const button = document.getElementById("addVehicleButton")

console.log("FUNNNYYY")
console.log(localStorage)

const addVehicle = async () => {
  const vehicleName = input.value;
  const userName = username;
  
  try {
    socket.emit("addVehicleToRoster", userName, vehicleName);

  } catch (error) {
    console.log(error);
  }
};

socket.on("displayVehicle", (vehicleName) => {

  const vehContainer = document.getElementById("vehicle-container");
  if (!vehContainer) {
    const vehContainer = document.createElement("div");
    vehContainer.id = "vehicle-container";
    document.body.appendChild(vehContainer);
  }
  document.getElementById("vehicle-container").innerHTML += `<p>${vehicleName}</p>`;
});

const buttonClick = async () => {
  console.log("click");
  addVehicle();
};

button.addEventListener("click", buttonClick);
