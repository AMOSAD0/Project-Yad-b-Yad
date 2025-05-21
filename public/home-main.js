// JavaScript for Dropdown Menu
window.addEventListener("load", function () {
  let isLoggedIn = false;
  let userObj = JSON.parse(localStorage.getItem("userLocal"));
  if (userObj) {
    switch (userObj.role) {
      case "admin":
        window.location.href = "http://localhost:3000/dashboard-admin-page.html";
        break;
      case "campaigner":
        window.location.href = "http://localhost:3000/compaignDashBoard.html";
        break;
      case "backer":
        isLoggedIn = true;
        break;
      default:
        break;
    }
  }
  else {
    isLoggedIn = false;
  }

  let profileButton = document.getElementById('btnProfile');
  if (isLoggedIn) {
    profileButton.href = "http://localhost:3000/profile.html";
    profileButton.innerText = "Profile";
  } else {
    profileButton.href = "http://localhost:3000/login.html";
    profileButton.innerText = "Login";
  }

  let listBtn = document.querySelector(".listBtn");
  let menuWrapper = document.querySelector(".menu-wrapper");

  // Toggle the 'active' class on the menu wrapper
  listBtn.addEventListener("click", function () {
    menuWrapper.classList.toggle("active");

    listBtn.classList.toggle("active");
  });
});

const scrollToTopBtn = document.querySelector(".home__go-down");
window.onscroll = function () {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});