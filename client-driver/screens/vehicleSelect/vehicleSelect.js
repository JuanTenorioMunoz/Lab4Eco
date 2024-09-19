let socket = io("http://localhost:5050", { path: "/real-time" });

const input = document.getElementById("input")
const addVehicleButton = document.getElementById("addVehicle")

const addVehicle = async () => {
  const vehicleName = input.value;
  
  try {
    socket.emit("addUserNameDriver", userName);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

  } catch (error) {
    console.log(error);
  }
};

const buttonClick = async () => {
  console.log("click");
  addVehicle();
};

button.addEventListener("click", buttonClick);
