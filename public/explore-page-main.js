
import { fetchJSONData, createCardCampaign } from "./functions.js";
import { campaign } from "./models/class-campaign.js";
window.addEventListener('load', function () {
    let divCards = this.document.getElementById('divCards');
    let campaignsData = [];
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
                data[i].image,
                data[i].category);

            if (data[i].isApproved == true) {
                campaignsData.push(obj);
                let d = createCardCampaign(obj);
                console.log(d);
                divCards.appendChild(d);
            }


        }
        console.log(campaignsData);
    });//fetch
});//load