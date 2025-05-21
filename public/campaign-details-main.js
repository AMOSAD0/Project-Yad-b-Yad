import { fetchJSONData } from "./functions.js";
import { createCardPledge } from "./functions.js";
window.addEventListener('load', function () {
    let titleCampaign = document.getElementById('titleCampaign');
    let descriptionCampaign = document.getElementById('descriptionCampaign');
    let userCampaign = document.getElementById('userCampaign');
    let goalCampaign = document.getElementById('goalCampaign');
    let progressCampaign = document.getElementById('progressCampaign');
    let donationsCampaign = document.getElementById('donationsCampaign');
    let divDonations = document.getElementById('divDonations');
    const campaignData = JSON.parse(this.localStorage.getItem('selectedCampaign'));
    let imgCampian = document.getElementById('imgCampian');
    let sectionFund = document.getElementById('sectionFund');
    let inputFunding = document.getElementById('inputFunding');
    let btnDonate = document.getElementById('btnDonate');
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
                sectionFund.style.display = "block";
                break;
            default:
                break;
        }
    }
    else {
        isLoggedIn = false;
        sectionFund.style.display = "none";
    }

    if (campaignData) {
        fetchJSONData(`http://localhost:3000/users/${campaignData.creatorId}`).then(data => {
            if (data) {
                userCampaign.innerText = data.name;
            }

        });
        fetchJSONData("http://localhost:3000/pledges").then(data => {
            let donations = data.filter(donation => donation.campaignId == campaignData.id);
            donations.forEach(donation => {
                console.log(donation);
                let obj = {
                    userName: "",
                    amount: donation.amount,
                };
                fetchJSONData(`http://localhost:3000/users/${donation.userId}`).then((data) => {
                    if (data) {
                        console.log(data);
                        obj.userName = data.name;

                        let d = createCardPledge(obj);
                        divDonations.appendChild(d);
                    }

                });
                // obj.amount = donation.amount;


            });
        });
        imgCampian.src = campaignData.img;
        titleCampaign.innerText = campaignData.title;
        descriptionCampaign.innerText = campaignData.description;
        goalCampaign.innerText = `$${campaignData.countDonations}/$${campaignData.goal}`;
        progressCampaign.value = campaignData.countDonations / campaignData.goal * 100;
        donationsCampaign.innerText = `${campaignData.donate} Donations`;
    }

    btnDonate.addEventListener('click', function () {
        let amount = inputFunding.value;
        amount = parseInt(amount);
        if (amount > 0 && amount != "" && amount <=( campaignData.goal-campaignData.countDonations)) {
            
            let obj = {
                userId: userObj.id,
                campaignId: campaignData.id,
                amount: amount
            };
            fetchJSONData("http://localhost:3000/pledges", "POST", obj).then(data => {
                
                let obj = {
                    countDonations: campaignData.countDonations + amount,
                    donate: campaignData.donate + 1
                };
                
                fetchJSONData(`http://localhost:3000/campaigns/${campaignData.id}`, "PATCH", obj).then(data => {
                   
                });
                 alert("Thank you for your donation!");
                window.location.href = "http://localhost:3000/explore-page.html";

            });
        }
        else {
            alert("Please enter a valid amount");
        }

    });

});// load