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

        titleCampaign.innerText = campaignData.title;
        descriptionCampaign.innerText = campaignData.description;
        goalCampaign.innerText = `$${campaignData.countDonations}/$${campaignData.goal}`;
        progressCampaign.value = campaignData.countDonations / campaignData.goal * 100;
        donationsCampaign.innerText = `${campaignData.donate} Donations`;
    }

});