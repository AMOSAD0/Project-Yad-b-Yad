// Remove a specific class from a list of elements
export function removeClass(elements, className) {
  elements.forEach((el) => {
    el.classList.remove(className);
  });
}

// Hide a list of elements by setting display to none
export function none(elements) {
  elements.forEach((el) => {
    el.style.display = "none";
  });
}

// export async function fetchJSONData(url) {
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         // console.log(data);
//         return data;
//     } catch (error) {
//         console.error('Failed to fetch data:', error);

//     }
// }

// Generic function to fetch JSON data with optional method and body
export async function fetchJSONData(url, method = "GET", body = null) {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    if (response.status !== 204) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
}

// Delete a user by ID (if not null)
export async function deleteUser(id) {
  if (id !== null) {
    await fetchJSONData(`http://localhost:3000/users/${id}`, "DELETE").then(
      (data) => {
        console.log(data);
      }
    );
  }
}

// Create and return a table row <tr> representing a user
export function createTableUser(obj) {
  let createTr = document.createElement("tr");

  // Create and append each <td> cell for user data
  let createTdid = document.createElement("td");
  createTdid.innerText = obj.id;
  createTr.appendChild(createTdid);

  let createTdname = document.createElement("td");
  createTdname.innerText = obj.name;
  createTr.appendChild(createTdname);

  let createTdemail = document.createElement("td");
  createTdemail.innerText = obj.email;
  createTr.appendChild(createTdemail);

  let createTdrole = document.createElement("td");
  createTdrole.innerText = obj.role;
  createTr.appendChild(createTdrole);

  // On clicking the row, show popup with user actions
  createTr.addEventListener("click", function () {
    divPopup.style.display = "block";
    popupName.innerText = obj.name;
    popupEmail.innerText = obj.email;
    popupEmail.style.display = "block";
    popupBan.style.display = "inline";

    // Handle ban/unban toggle
    popupBan.className = "btn btn-warning";
    if (!obj.isActive) {
      popupBan.innerText = "unban";
    } else {
      popupBan.innerText = "ban";
    }
    popupBan.addEventListener("click", function () {
      if (confirm("Are you sure you want to ban this user?")) {
        fetchJSONData(`http://localhost:3000/users/${obj.id}`, "PATCH", {
          isActive: !obj.isActive,
        }).then(() => {
          location.reload();
        });
      }
    });


    // If user is campaigner and not approved, show accept button
    if (obj.role == "campaigner" && obj.isApproved == false) {
      popupBan.style.display = "inline";
      popupBan.className = "btn btn-success";
      popupBan.innerText = "accept";
      popupBan.addEventListener("click", function () {
        fetchJSONData(`http://localhost:3000/users/${obj.id}`, "PATCH", {
          isApproved: true,
        }).then(() => {
          location.reload();

        });
      }); // pop accept
    }

    // Close popup
    popupClose.addEventListener("click", function () {
      divPopup.style.display = "none";
    });

    // Delete user
    popupDelete.addEventListener("click", function () {
      if (confirm("Are you sure you want to delete this user?")) {
        fetchJSONData(`http://localhost:3000/users/${obj.id}`, "DELETE").then(
          () => {
            location.reload();
          }
        );
      }
    });
  });

  return createTr;
}

// Create and return a table row <tr> representing a campaign
export function createTableCompains(obj) {
  let createTr = document.createElement("tr");

  let createTdid = document.createElement("td");
  createTdid.innerText = obj.id;
  createTr.appendChild(createTdid);

  let createTdtitle = document.createElement("td");
  createTdtitle.innerText = obj.title;
  createTr.appendChild(createTdtitle);

  let createTdgoal = document.createElement("td");
  createTdgoal.innerText = obj.goal;
  createTr.appendChild(createTdgoal);

  let createTddeadline = document.createElement("td");
  createTddeadline.innerText = obj.deadline;
  createTr.appendChild(createTddeadline);

  // On clicking row, show campaign popup
  createTr.addEventListener("click", function () {
    divPopup.style.display = "block";
    popupName.innerText = obj.title;
    popupEmail.style.display = "none";
    if (obj.isApproved) {
      popupBan.style.display = "none";
    } else {
      popupBan.style.display = "inline";
      popupBan.className = "btn btn-success";
      popupBan.innerText = "accept";

      // Accept campaign
      popupBan.addEventListener("click", function () {
        fetchJSONData(`http://localhost:3000/campaigns/${obj.id}`, "PATCH", {
          isApproved: true,
        }).then(() => {
          location.reload();
        });
      }); // pop accept
    }

    // Close popup
    popupClose.addEventListener("click", function () {
      divPopup.style.display = "none";
    });

    // Delete campaign
    popupDelete.addEventListener("click", function () {
      if (confirm("Are you sure you want to delete this campaigns ?")) {
        fetchJSONData(
          `http://localhost:3000/campaigns/${obj.id}`,
          "DELETE"
        ).then(() => {
          location.reload();
        });
      }
    });
  });
  return createTr;
}

// Fetch and display dashboard data: users, campaigns, donation
export function getDataDisplayDashBord(
  tbodyMainContent,
  valueUsers,
  valueCampigns,
  valueDonations
) {
  let usersData = [];

  // Load and render users
  fetchJSONData("http://localhost:3000/users").then((data) => {
    tbodyMainContent.innerHTML = "";

    console.log(data);
    for (let i = 0; i < data.length; ++i) {
      usersData.push(data[i]);
      tbodyMainContent.appendChild(createTableUser(data[i]));
    }

    // Display user count
    valueUsers.innerText = usersData.length;
  });

  // Load campaigns count
  fetchJSONData("http://localhost:3000/campaigns").then((data) => {
    valueCampigns.innerText = data.length;
  });

  // Load and sum donations
  fetchJSONData("http://localhost:3000/pledges").then((data) => {
    let money = 0;
    for (let i = 0; i < data.length; ++i) {
      money = money + data[i].amount;
    }
    valueDonations.innerText = `$${money}`;
  });
  console.log(usersData);
  return usersData;
}

// ******* Validation Functions *******
// Check if email is valid using regex pattern
export function isEmailValid(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// Check if password is at least 6 characters long
export function isPasswordStrong(password) {
  return password.length >= 6;
}

// Check if string is not empty (ignoring whitespace)
export function isNotEmpty(value) {
  return value.trim() !== "";
}
// ****** Validation Message *********
// Create a styled error message element
export function createErrMsg(msg) {
  let divErr = document.createElement("div");
  divErr.className = "invalid";
  divErr.innerText = msg;
   return divErr;
}


//         valueUsers.innerText = usersData.length;
//     });
//     fetchJSONData("http://localhost:3000/campaigns").then(data => {
//         valueCampigns.innerText = data.length;
//     });
//     fetchJSONData("http://localhost:3000/pledges").then(data => {
//         let money = 0;
//         for (let i = 0; i < data.length; ++i) {
//             money = money + data[i].amount;
//         }
//         valueDonations.innerText = `$${money}`;
//     });
//     console.log(usersData);
//     return usersData;
// }

export function createCardCampaign(obj,page="") {
    // let createDiv = document.createElement('div');
    // createDiv.className= "card size-card";

    // let createImg = document.createElement('img');
    // createImg.src="./assets/image/imgCard.svg";
    // createImg.className =""

    let createDiv = document.createElement('div');
    createDiv.className = "col-12 col-md-6 col-lg-4";
    createDiv.innerHTML =
        `
    <div class="card size-card">
                            <img src="./assets/image/imgCard.svg"
                                class="card-img-top">
                            <div class="card-body">
                                <p class="card-title font-black-600-24">
                                    ${obj.title}
                                </p>
                                <p
                                    class="card-text text-truncate font-gray-400-16">
                                    ${obj.description}
                                </p>
                                <progress class="progress" max="100"
                                    value="${obj.valueProgress()}"></progress>
                                <div
                                    class="d-flex justify-content-between mt-2">
                                    <div class="d-flex align-items-center">
                                        <img class="w-25 icon-card"
                                            src="./assets/icon/gift.svg">
                                        <p
                                            class="font-black-500-16 m-1">$${obj.goal}</p>
                                    </div>
                                    <p class="font-black-500-16 m-1">%${obj.valueProgress()}</p>
                                </div>
                            </div>
                        </div>
                    `;

    createDiv.addEventListener('click', function () {
        localStorage.setItem('selectedCampaign', JSON.stringify(obj));
        if (page == "campaign-dashbord") {
          window.location.href = "yourCompaign.html";
        }else{
          window.location.href = "campaign-details-page.html";
        }
        
    });// createDiv.addEventListener

    return createDiv;


}

export function createCardPledge(obj) {
    let createDiv = document.createElement('div');
    createDiv.className = "row align-items-center";
    createDiv.innerHTML = `<div
                                            class="col-6 rounded-5 div--icon-person ">
                                            <img src="assets/icon/person.svg">
                                        </div>
                                        <div class="col mt-3">
                                            <p class="font-black-600-18  mb-0">
                                                ${obj.userName} </p>
                                            <p class="font-black-600-14">
                                                $${obj.amount}
                                            </p>
                                        </div>`;

    return createDiv;
}

export async function convertImageBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

