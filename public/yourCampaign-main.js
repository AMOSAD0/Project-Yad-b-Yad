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
    let dataCampaigners = [];

    let obj = JSON.parse(localStorage.getItem('selectedCampaign'));
    console.log(obj);

    titleCampaign.innerText = obj.title;
    countDonations.innerText = `$${obj.countDonations}`;
    titleCampaign2.innerText = obj.title;
    descriptionCampaign.innerText = obj.description;
    goaleCampaign.innerText = `Goal: $${obj.goal}`;
    donateCampaign.innerText = obj.donate;
    deadlineCampaign.innerText = obj.deadline;

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