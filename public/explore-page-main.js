
import { fetchJSONData, createCardCampaign } from "./functions.js";
import { campaign } from "./models/class-campaign.js";
window.addEventListener('load', function () {
     let divCards = this.document.getElementById('divCards');
    let selectedCampaign =this.document.getElementById("selectCategory");
    let inputSearch = this.document.getElementById("inputSearch");
    let campaignsData = [];
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
    else{
        isLoggedIn = false;
    }
    let profileButton = document.getElementById('btnProfile');
    if(isLoggedIn){
        profileButton.href = "http://localhost:3000/profile.html";
        profileButton.innerText = "Profile";
    }else{
        profileButton.href = "http://localhost:3000/login.html";
        profileButton.innerText = "Login";
    }

    fetchJSONData('http://localhost:3000/campaigns').then(data => {
        campaignsData = [];
        divCards.innerHTML = '';
        for (let i = 0; i < data.length; ++i) {
            let obj = new campaign(
                data[i].title,
                data[i].description,
                data[i].creatorId,
                data[i].goal,
                data[i].donate,
                data[i].countDonations,
                data[i].deadline,
                data[i].isApproved,
                data[i].img,
                data[i].category);
            obj.id = data[i].id;

            if (data[i].isApproved == true) {
                campaignsData.push(obj);
                let d = createCardCampaign(obj);
                divCards.appendChild(d);
            }


        }
      
    });//fetch

    selectedCampaign.addEventListener('change', function () {
        divCards.innerHTML = '';
        let selectedValue = this.value;
        console.log(selectedValue);
        if (selectedValue == "all") {
            for (let i = 0; i < campaignsData.length; ++i) {
                let d = createCardCampaign(campaignsData[i]);
                divCards.appendChild(d);
            }
        } else {
            for (let i = 0; i < campaignsData.length; ++i) {
                if (campaignsData[i].category == selectedValue) {
                    let d = createCardCampaign(campaignsData[i]);
                    divCards.appendChild(d);
                }
            }
        }
    });//selectCategory


    inputSearch.addEventListener('input', function () {
        divCards.innerHTML = '';
        let searchValue = this.value.toLowerCase();
        for (let i = 0; i < campaignsData.length; ++i) {
            if (campaignsData[i].title.toLowerCase().includes(searchValue)) {
                let d = createCardCampaign(campaignsData[i]);
                divCards.appendChild(d);
            }
        }
    });//inputSearch

});//load