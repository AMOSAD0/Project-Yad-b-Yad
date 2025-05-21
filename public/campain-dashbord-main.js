import { fetchJSONData, createCardCampaign } from './functions.js';
import { campaign } from './models/class-campaign.js';
window.addEventListener('load', () => {

    let countCampaigns = document.getElementById('countCampaigns');
    let divCampaigns = document.getElementById('divCampaigns');
    let divAlert = document.querySelector('.alert');
    let userObj = JSON.parse(localStorage.getItem('userLocal'));
    let btnLogout = document.getElementById('btnLogout');
    let dataCampaigns = [];

    if (userObj) {
        switch (userObj.role) {
            case "admin":
                window.location.href = "http://localhost:3000/dashboard-admin-page.html";
                break;
            case "campaigner":
                break;
            case "backer":
                window.location.href = "http://localhost:3000/index.html";
                break;
            default:
                break;
        }
    }
    else {
        window.location.href = "http://localhost:3000/index.html";
    }

    if (userObj.isApproved == false) {
        divAlert.style.display = "block";
        divAlert.innerText = "Your account is not approved yet. Please wait for the admin to approve your account.";
        setTimeout(() => {
            divAlert.style.display = "none";
            localStorage.removeItem('userLocal');
            window.location.href = "http://localhost:3000/index.html";
        }, 5000);
    }


    fetchJSONData('http://localhost:3000/campaigns')
        .then(data => {
            dataCampaigns = data.filter(campaign => campaign.creatorId == userObj.id);
            console.log(dataCampaigns);
            countCampaigns.innerText = dataCampaigns.length;
            for (let i = 0; i < dataCampaigns.length; i++) {
                let obj = new campaign(
                    dataCampaigns[i].title,
                    dataCampaigns[i].description,
                    dataCampaigns[i].creatorId,
                    dataCampaigns[i].goal,
                    dataCampaigns[i].donate,
                    dataCampaigns[i].countDonations,
                    dataCampaigns[i].deadline,
                    dataCampaigns[i].isApproved,
                    dataCampaigns[i].img,
                    dataCampaigns[i].category
                );

                obj.id = dataCampaigns[i].id;
                let cardCampaign = createCardCampaign(obj, "campaign-dashbord");
                divCampaigns.appendChild(cardCampaign);
            }
        });

    btnLogout.addEventListener("click", (e) => {
        let confirmation = confirm("Are you sure you want to log out?");
        if (confirmation) {
            localStorage.removeItem("userLocal");
            window.location.href = "http://localhost:3000/index.html";
        }
    });// logout

});//load