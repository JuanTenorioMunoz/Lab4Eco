let socket = io("http://localhost:5050", { path: "/real-time" });

const button = document.getElementById("login-button");
const input = document.getElementById("input");

const saveUserName = async () => {
  const userName = input.value;

  try {
    socket.emit("addUserName", userName);

    const response = await fetch("http://localhost:5050/");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    renderData(data); // Assuming renderData only needs data
  } catch (error) {
    console.log(error);
  }
};

const buttonClick = async () => {
  console.log("click");
  await saveUserName(); // Wait for the username to be saved before redirecting
  window.location.href = "/screens/vehicleSelect/index.html";
};

button.addEventListener("click", buttonClick);
