// Import validation and utility functions
import {
  isEmailValid,
  isPasswordStrong,
  isNotEmpty,
  createErrMsg,
  fetchJSONData,
} from "./functions.js";

// Import user class
import { user } from "./models/class-user.js";

window.addEventListener("load", function () {
  // Get form input elements by ID
  let name = document.getElementById("name");
  let email = document.getElementById("mail");
  let password = document.getElementById("pass");
  let role = this.document.getElementById("role");
  let alert = this.document.querySelector(".alert");

  // Create validation error messages for each field
  let errName = createErrMsg("Please enter your first and last name.");
  let errEmail = createErrMsg("Please enter a valid email.");
  let errPassword = createErrMsg("Password must be at least 6 characters.");
  // Append error message elements directly after each input field
  name.after(errName);
  email.after(errEmail);
  password.after(errPassword);

  // Handle form submission
  document
    .getElementById("signupForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // Validate all fields before submission AND Show/hide MSG
      if (
        !isNotEmpty(name.value) ||
        !isEmailValid(email.value) ||
        !isPasswordStrong(password.value)
      ) {
        if (!isNotEmpty(name.value)) {
          errName.style.display = "block";
        } else {
          errName.style.display = "none";
        }

        if (!isEmailValid(email.value)) {
          errEmail.style.display = "block";
        } else {
          errEmail.style.display = "none";
        }
        if (!isPasswordStrong(password.value)) {
          errPassword.style.display = "block";
        } else {
          errPassword.style.display = "none";
        }
      } else {
        errName.style.display = "none";
        errEmail.style.display = "none";
        errPassword.style.display = "none";

        // Check if the email already exists by fetching all users
        fetchJSONData("http://localhost:3000/users").then((data) => {
          let emailExists = data.some(
            (usersJson) => usersJson.email === email.value
          );

          // If email exists, show error message
          if (emailExists) {
            alert.innerText = "❌ E-mail already exists";
            alert.style.display = "block";
          } else {
            // If email is unique, send POST request to add user
            fetchJSONData("http://localhost:3000/users", "POST", {
              name: name.value,
              role: role.value,
              isActive: true,
              isApproved: false,
              email: email.value,
              password: password.value,
            }).then((data) => {
              localStorage.setItem("userLocal", JSON.stringify(data));
            });

            alert.innerText = "✅ Sign up successful!";
            alert.style.color = "green";
            alert.style.display = "block";
            // let userObj = JSON.parse(
            //   localStorage.getItem("userLocal")
            // );
            setTimeout(() => {
              alert.style.display = "none";
              window.location.href = "http://localhost:3000/index.html";
              
            }, 500);
          }
        });
      }
    });
});
