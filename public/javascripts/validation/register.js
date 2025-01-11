import { validateEmail } from "../helper.js";

// Register form validation
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Stop the default form submission

  // Get form values
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document
    .getElementById("confirmPassword")
    .value.trim();

  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  // Client-side validation
  if (!validateEmail(email)) {
    emailError.textContent = "Please enter a valid email address.";
    emailError.style.color = "red";
  } else if (password.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters.";
    passwordError.style.color = "red";
  } else if (password !== confirmPassword) {
    confirmPasswordError.textContent = "Passwords do not match.";
    confirmPasswordError.style.color = "red";
  } else {
    // Set the action dynamically
    registerForm.action = "/sign-up";
    registerForm.methood = "POST";
    registerForm.submit();
  }
});
