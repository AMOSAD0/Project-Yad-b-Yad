import { fetchJSONData, createCardPledge } from './functions.js';
window.addEventListener('load', () => {
    let titleCampaign = document.getElementById('titleCampaign');
    let countDonations = document.getElementById('countDonations');
    let titleCampaign2 = document.getElementById('titleCampaign2');
    let descriptionCampaign = document.getElementById('descriptionCampaign');
    let goaleCampaign = document.getElementById('goaleCampaign');
    let donateCampaign = document.getElementById('donateCampaign');
    let deadlineCampaign = document.getElementById('deadlineCampaign');
    let divInvestor = document.getElementById('divInvestor');
    let imageCampaign = document.getElementById('imageCampaign');
    let userObj = JSON.parse(localStorage.getItem('userLocal'));
    let dataCampaigners = [];
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

    let obj = JSON.parse(localStorage.getItem('selectedCampaign'));
    console.log(obj);

    titleCampaign.innerText = obj.title;
    countDonations.innerText = `$${obj.countDonations}`;
    titleCampaign2.innerText = obj.title;
    descriptionCampaign.innerText = obj.description;
    goaleCampaign.innerText = `Goal: $${obj.goal}`;
    donateCampaign.innerText = obj.donate;
    deadlineCampaign.innerText = obj.deadline;
    imageCampaign.src = obj.img;

    fetchJSONData('http://localhost:3000/pledges')
        .then(data => {
            dataCampaigners = data.filter(pledge => pledge.campaignId == obj.id);
            console.log(dataCampaigners);
            for (let i = 0; i < dataCampaigners.length; i++) {
                let obj = {};
                fetchJSONData(`http://localhost:3000/users/${dataCampaigners[i].userId}`).then(data => {
                    console.log(data);
                    obj.userName = data.name;
                    obj.amount = dataCampaigners[i].amount;
                    let cardInvestor = createCardPledge(obj);

                    divInvestor.appendChild(cardInvestor);
                });

            }
        });



});//load