const socket = io("http://localhost:5050")

const button = document.getElementById("login-button");
const input = document.getElementById('input')

console.log("HOLA")

const buttonClick = () => {
  console.log("clik")
  window.location.href = "/screens/vehicleSelect/index.html"
}

button.addEventListener("click", buttonClick);

