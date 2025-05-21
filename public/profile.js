import {
  isNotEmpty,
  isPasswordStrong,
  createErrMsg,
  fetchJSONData,
  createCardCampaign
} from "./functions.js";
import { campaign } from "./models/class-campaign.js";
window.addEventListener("load", () => {
  let profileName = document.getElementById("profileName");
  let profileEmail = document.getElementById("profileEmail");
  let nameInput = document.getElementById("name");
  let mailInput = document.getElementById("mail");
  let passInput = document.getElementById("pass");
  let inputEle = document.querySelectorAll(".inputEle");
  let editBtn = document.querySelector(".edit-btn");
  let divCards = document.getElementById("divCards");
  let btnLogout = document.getElementById("btnLogout");
  let dataCampaigns = [];

  // Create error message elements and insert them after inputs
  let nameMsg = createErrMsg("Name must be at least 3 characters.");
  let passMsg = createErrMsg("Password must be at least 6 characters.");
  nameInput.after(nameMsg);
  passInput.after(passMsg);
  let userObj = JSON.parse(localStorage.getItem("userLocal"));

  if (userObj) {
    switch (userObj.role) {
      case "admin":
        window.location.href = "http://localhost:3000/dashboard-admin-page.html";
        break;
      case "campaigner":
        window.location.href = "http://localhost:3000/compaignDashBoard.html";
        break;
      // case "backer":
      //   break;
      // default:
      //   break;
    }
  }
  else {
    window.location.href = "http://localhost:3000/login.html";
  }

  profileName.innerText = userObj.name;
  profileEmail.innerText = userObj.email;
  nameInput.value = userObj.name;
  mailInput.value = userObj.email;
  passInput.value = userObj.password;

  fetchJSONData('http://localhost:3000/pledges').then(data => {
    data.filter((pledges) => {
      if (pledges.userId == userObj.id) {
        fetchJSONData(`http://localhost:3000/campaigns/${pledges.campaignId}`).then(data => {
          let obj = new campaign(
            data.title,
            data.description,
            data.creatorId,
            data.goal,
            data.donate,
            data.countDonations,
            data.deadline,
            data.isApproved,
            data.img,
            data.category
          );
          obj.id = data.id;
          dataCampaigns.push(obj);
          let d = createCardCampaign(obj);
          divCards.appendChild(d);
        });// fetch campaigns data

      }
    });
  });// fetch campaigns data





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
  });// edite

  btnLogout.addEventListener("click", (e) => {
    let confirmation = confirm("Are you sure you want to log out?");
    if (confirmation) {
      localStorage.removeItem("userLocal");
      window.location.href = "http://localhost:3000/index.html";
    }
  });// logout



});//load
