const goToLogin = () => {
  console.log("WORK")
  window.location.href = "./login/login.html"
}

const goToSignUp = () => {
  window.location.href = "./signUp/signUp.html"
}

document.getElementById("login").addEventListener("click", goToLogin);
document.getElementById("signUp").addEventListener("click", goToSignUp);
