// Import functions and user class
import {
  isEmailValid,
  isPasswordStrong,
  createErrMsg,
  fetchJSONData,
} from "./functions.js";
import { user } from "./models/class-user.js";

window.addEventListener("load", function () {
  // Select form input fields
  let email = document.getElementById("mail");
  let password = document.getElementById("pass");

  // Select "Register now" text
  let logIn__register = this.document.querySelector(".logIn__register");

  // Create error message elements and insert them after inputs
  let emailMsg = createErrMsg("Invalid email address.");
  let passMsg = createErrMsg("Password must be at least 6 characters.");
  email.after(emailMsg);
  password.after(passMsg);

  // Select the alert message div
  let alertDiv = this.document.querySelector(".alert");

  // Handle form submission
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    // Validate email and password inputs AND Show/hide MSG
    if (!isEmailValid(email.value) || !isPasswordStrong(password.value)) {
      if (!isEmailValid(email.value)) {
        emailMsg.style.display = "block";
      } else {
        emailMsg.style.display = "none";
      }

      if (!isPasswordStrong(password.value)) {
        passMsg.style.display = "block";
      } else {
        passMsg.style.display = "none";
      }
    } else {
      emailMsg.style.display = "none";
      passMsg.style.display = "none";

      // Fetch users from JSON Server
      fetchJSONData("http://localhost:3000/users").then((data) => {
        // console.log(data);
        let emailFound = false;
        let loginSuccess = false;
        let userObj = new user();

        // Loop through users to validate login
        for (let i = 0; i < data.length; i++) {
          if (data[i].email === email.value) {
            emailFound = true;
            if (data[i].password === password.value) {
              loginSuccess = true;
              userObj = data[i];

              // Store logged-in user in localStorage
              this.localStorage.setItem("userLocal", JSON.stringify(userObj));
            }
            break;
          }
        }

        // Show login result messages
        if (loginSuccess) {
          alertDiv.innerText = "✅ Login successful!";
          alertDiv.style.color = "green";
          alertDiv.style.display = "block";

          setTimeout(() => {
            // window.location.href = "dashboard.html";

            // clear fields
            email.value = "";
            password.value = "";
          }, 1000);
        } else if (emailFound) {
          // Email found but password wrong
          alertDiv.innerText = "❌ Password Incorrect";
          alertDiv.style.display = "block";
        } else {
          // Email not found at all
          alertDiv.innerText = "❌ Email Incorrect";
          alertDiv.style.display = "block";
        }
      });
    }
  }); //submit

  // Handle click on "Register Now" to go to signup page
  logIn__register.addEventListener("click", function () {
    window.location.href = "http://localhost:3000/signUp.html";
  });
}); // load
