// Initialize and connect to socket.io server
const socket = io("http://localhost:5050");

// Event listener for incoming messages
socket.on("message", (message) => {
  console.log("Received message:", message);
  
  // Display the message in the UI
  const messageContainer = document.getElementById("message-container");
  if (!messageContainer) {
    const newContainer = document.createElement("div");
    newContainer.id = "message-container";
    document.body.appendChild(newContainer);
  }
  document.getElementById("message-container").innerHTML += `<p>${message}</p>`;
});

document.getElementById("post-button").addEventListener("click", createUser);
const input = document.getElementById("input");

async function createUser() {
  renderLoadingState();
  let existingUser = null; // Move the declaration outside the try-catch block
  
  try {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    
    try {
      const response = await fetch(`http://localhost:5050/user?name=${input.value}`);
      
      if (response.ok) {
        existingUser = await response.json(); // Parse the user if found
      } else {
        console.log("User not found, proceeding to create new user");
      }
    } catch (error) {
      console.log("Error while fetching user:", error);
    }
    
    const player = {
      name: input.value,
      option: selectedOption.value,
      profilePicture: "https://avatar.iran.liara.run/public/13", 
    };

    if (existingUser && existingUser.name === player.name) {
      console.log("PATCHINGGG");
      const updateResponse = await fetch(`http://localhost:5050/user?name=${input.value}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(player),
      });

      if (!updateResponse.ok) {
        throw new Error("Network response was not ok");
      }

      // Emit a message to the server about the updated user
      socket.emit('message', `User updated: ${input.value}`);
      
      renderData();
    } else {
      console.log("POSTING");
      const createResponse = await fetch("http://localhost:5050/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(player),
      });

      if (!createResponse.ok) {
        throw new Error("Network response was not ok");
      }

      // Emit a message to the server about the new user
      socket.emit('message', `New user created: ${input.value}`);
      
      renderData();
    }
    
  } catch (error) {
    renderErrorState();
  }
}

function renderErrorState() {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; 
  container.innerHTML = "<p>Failed to load data</p>";
  console.log("Failed to load data");
}

function renderLoadingState() {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; 
  container.innerHTML = "<p>Loading...</p>";
  console.log("Loading...");
}

function renderData() {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; 
  const div = document.createElement("div");
  div.className = "item";
  div.innerHTML = "Player created";
  container.appendChild(div);
}
