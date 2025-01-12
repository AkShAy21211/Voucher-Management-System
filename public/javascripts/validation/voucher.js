const form = document.getElementById("settingsForm");

form.addEventListener("submit", async (event) => {
  let isValid = true;

  // Get input values
  const title = document.getElementById("title").value;
  const expiryTime = document.getElementById("expiryTime").value;
  const width = document.getElementById("width").value;
  const height = document.getElementById("height").value;
  const titleFontSize = document.getElementById("titleFontSize").value;
  const textFontSize = document.getElementById("textFontSize").value;

  // Clear previous errors
  clearErrors();

  if (title.trim().length <= 3) {
    showError("titleError", "Title must be at least 3 characters long.");
    isValid = false;
  }
  // Validate fields
  if (expiryTime <= 0) {
    showError("expiryTimeError", "Expiry time must be greater than 0.");
    isValid = false;
  }

  if (width <= 0) {
    showError("widthError", "Width must be greater than 0.");
    isValid = false;
  }

  if (height <= 0) {
    showError("heightError", "Height must be greater than 0.");
    isValid = false;
  }

  if (titleFontSize <= 0) {
    showError("titleFontSizeError", "Title font size must be greater than 0.");
    isValid = false;
  }

  if (textFontSize <= 0) {
    showError(
      "textFontSizeError",
      "Normal text font size must be greater than 0."
    );
    isValid = false;
  }

  // Prevent form submission if validation fails
  if (!isValid) {
    event.preventDefault();
  }
  // Update settings on successful form submission
  else {
    await fetch("/dashboard/settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        expiryTime,
        width,
        height,
        titleFontSize,
        textFontSize,
      }),
    });
  }
});

function showError(id, message) {
  document.getElementById(id).innerText = message;
}

function clearErrors() {
  const errorFields = [
    "expiryTimeError",
    "widthError",
    "heightError",
    "titleFontSizeError",
    "textFontSizeError",
  ];
  errorFields.forEach((id) => {
    document.getElementById(id).innerText = "";
  });
}
