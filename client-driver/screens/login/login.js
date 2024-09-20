let socket = io("http://localhost:5050", { path: "/real-time" });

const button = document.getElementById("login-button");
const input = document.getElementById("input");

console.log("FUNNNNY")

const saveUserName = async () => {
  const userName = input.value;
  
  try {
    socket.emit("addUserNameDriver", userName);
    localStorage.setItem('username', userName);
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
