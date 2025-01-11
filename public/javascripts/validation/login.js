import { validateEmail } from "../helper.js";

// Login form validation
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Stop the default form submission

  // Get form values
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const usernameError = document.getElementById("usernameError");
  const passwordError = document.getElementById("passwordError");

  // Client-side validation
  if (!username) {
    usernameError.textContent = "Please enter your username";
    usernameError.style.color = "red";
  } else if (password.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters.";
    passwordError.style.color = "red";
  } else {
    // Set the action dynamically
    usernameError.textContent = "";
    passwordError.textContent = "";
    loginForm.action = "/sign-in";
    loginForm.method = "POST";
    loginForm.submit();
  }
});
