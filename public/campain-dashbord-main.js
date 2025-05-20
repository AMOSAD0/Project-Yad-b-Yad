import {fetchJSONData,createCardCampaign} from './functions.js';
import{campaign} from './models/class-campaign.js';
window.addEventListener('load', () => {

    let countCampaigns =document.getElementById('countCampaigns');
    let divCampaigns = document.getElementById('divCampaigns');
    let dataCampaigns = [];
    fetchJSONData('http://localhost:3000/campaigns')
    .then(data => {
        dataCampaigns = data.filter(campaign => campaign.creatorId == '4');
        console.log(dataCampaigns);
        countCampaigns.innerText=dataCampaigns.length;
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
                dataCampaigns[i].image,
                dataCampaigns[i].category
            );
            obj.id = dataCampaigns[i].id;
            let cardCampaign = createCardCampaign(obj,"campaign-dashbord");
            divCampaigns.appendChild(cardCampaign);
        }
    });

});//load