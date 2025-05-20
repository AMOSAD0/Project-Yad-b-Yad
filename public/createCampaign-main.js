import { fetchJSONData, createErrMsg, isNotEmpty,convertImageBase64 } from "./functions.js";
import { campaign } from "./models/class-campaign.js";

window.addEventListener('load', function () {
    let campaignTitle = document.getElementById('campaignTitle');
    let category = document.getElementById('category');
    let shortDesc = document.getElementById('shortDesc');
    let campaignImg = document.getElementById('campaignImg');
    let goalAmount = document.getElementById('goalAmount');
    let deadlineDate = document.getElementById('deadlineDate');
    let createCampaignForm = document.getElementById('createCampaignForm');
    let divAlert = document.querySelector('.alert');
    let titleErrMsg = createErrMsg('Please enter a campaign title');
    campaignTitle.after(titleErrMsg);
    let categoryErrMsg = createErrMsg('Please select a category');
    category.after(categoryErrMsg);
    let shortDescErrMsg = createErrMsg('Please enter a short description');
    shortDesc.after(shortDescErrMsg);
    let campaignImgErrMsg = createErrMsg('Please upload a campaign image');
    campaignImg.after(campaignImgErrMsg);
    let goalAmountErrMsg = createErrMsg('Please enter a goal amount');
    goalAmount.after(goalAmountErrMsg);
    let deadlineDateErrMsg = createErrMsg('Please select a deadline date');
    deadlineDate.after(deadlineDateErrMsg);
    let campaignImgValue ;

    campaignImg.addEventListener('change', function (e) {
        let file = e.target.files[0];
        if (file) {
             convertImageBase64(file).then((img)=>{
                campaignImgValue = img;
             });
        }
            
        });//img 

    createCampaignForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let campaignTitleValue = campaignTitle.value;
        let categoryValue = category.value;
        let shortDescValue = shortDesc.value;
        let goalAmountValue = goalAmount.value;
        let deadlineDateValue = deadlineDate.value;
        

        
        

        if (isNotEmpty(campaignTitleValue) && isNotEmpty(categoryValue) && isNotEmpty(shortDescValue)  && isNotEmpty(goalAmountValue) && isNotEmpty(deadlineDateValue)) {
            let newCampaign = new campaign(
                campaignTitleValue,
                shortDescValue,
                "4",
                goalAmountValue,
                0,
                0,
                deadlineDateValue,
                false,
                campaignImgValue,
                categoryValue
            );
            console.log(newCampaign);
          
            fetchJSONData('http://localhost:3000/campaigns','POST',newCampaign)
                .then(function(data){
                    
                
                        divAlert.style.display = 'block';
                        divAlert.innerText = 'Campaign created successfully';
                        setTimeout(() => {
                            divAlert.style.display = 'none';
                        }, 4000);
                        // window.location.href = 'index.html';
                    
                })
                .catch(function(err){
                    console.error(err);
                });
                

        } else {
            if (!isNotEmpty(campaignTitleValue)) {
                titleErrMsg.style.display = 'block';
            }
            else {
                titleErrMsg.style.display = 'none';

            }
            if (!isNotEmpty(categoryValue)) {
                categoryErrMsg.style.display = 'block';
            }
            else {
                categoryErrMsg.style.display = 'none';
            }

            if (!isNotEmpty(shortDescValue)) {
                shortDescErrMsg.style.display = 'block';
            }
            else {
                shortDescErrMsg.style.display = 'none';
            }
            if (!isNotEmpty(campaignImgValue)) {
                campaignImgErrMsg.style.display = 'block';
            }
            else {
                campaignImgErrMsg.style.display = 'none';
            }
            if (!isNotEmpty(goalAmountValue)) {
                goalAmountErrMsg.style.display = 'block';
            }
            else {
                goalAmountErrMsg.style.display = 'none';
            }
            if (!isNotEmpty(deadlineDateValue)) {
                deadlineDateErrMsg.style.display = 'block';
            }
            else {
                deadlineDateErrMsg.style.display = 'none';
            }
            console.log('Please fill all the fields');
        }
    });


});//load