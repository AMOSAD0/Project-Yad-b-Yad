import {
  isNotEmpty,
  isPasswordStrong,
  createErrMsg,
  fetchJSONData,
} from "./functions.js";
window.addEventListener("load", () => {
  let profileName = document.getElementById("profileName");
  let profileEmail = document.getElementById("profileEmail");
  let nameInput = document.getElementById("name");
  let mailInput = document.getElementById("mail");
  let passInput = document.getElementById("pass");
  let inputEle = document.querySelectorAll(".inputEle");
  let editBtn = document.querySelector(".edit-btn");

  // Create error message elements and insert them after inputs
  let nameMsg = createErrMsg("Name must be at least 3 characters.");
  let passMsg = createErrMsg("Password must be at least 6 characters.");
  nameInput.after(nameMsg);
  passInput.after(passMsg);

  let userObj = {
    id: "2",
    name: "Ahmed Mossad",
    role: "admin",
    isActive: true,
    email: "ahmedadmin@example.com",
    password: "ahmed1234",
  };

  profileName.innerText = userObj.name;
  profileEmail.innerText = userObj.email;

  nameInput.value = userObj.name;
  mailInput.value = userObj.email;
  passInput.value = userObj.password;

  let isEditing = false;
  editBtn.addEventListener("click", (e) => {
    if (!isEditing) {
      let confirmation = confirm("Do You Want To Edit Your Data? ");
      if (confirmation) {
        inputEle.forEach((input) => {
          input.removeAttribute("disabled");
        });
        editBtn.innerText = "Save";
        isEditing = true;
      }
    } else {
      let confirmation = confirm("Save Changes?");
      if (confirmation) {
        if (
          !isNotEmpty(nameInput.value) ||
          !isPasswordStrong(passInput.value)
        ) {
          if (!isNotEmpty(nameInput.value)) {
            e.preventDefault();
            nameMsg.style.display = "block";
          } else {
            userObj.name = nameInput.value;
            nameMsg.style.display = "none";
          }

          if (!isPasswordStrong(passInput.value)) {
            e.preventDefault();
            passMsg.style.display = "block";
          } else {
            userObj.password = passInput.value;
            passMsg.style.display = "none";
          }
        } else {
          fetchJSONData(
            `http://localhost:3000/users/${userObj.id}`,
            "PATCH",
            userObj
          )
            .then(() => {
              alert("User updated successfully!");
              inputEle.forEach((input) => input.setAttribute("disabled", true));
              editBtn.innerText = "Edit";
              isEditing = false;
            })
            .catch((error) => {
              console.error("Update failed:", error);
              alert("Something went wrong while updating.");
            });
        }
      }
    }
  });
});
