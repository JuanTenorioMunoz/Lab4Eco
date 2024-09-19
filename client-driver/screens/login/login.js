let socket = io("http://localhost:5050", { path: "/real-time" });

const button = document.getElementById("login-button");
const input = document.getElementById("input");

const saveUserName = async () => {
  const userName = input.value;
  
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
  await saveUserName(); 
  window.location.href = "/screens/vehicleSelect/index.html";
};

button.addEventListener("click", buttonClick);
