import { removeClass, none, fetchJSONData, createTableUser, createTableCompains, getDataDisplayDashBord } from './functions.js';


window.addEventListener('load', () => {


    let buttonDashbord = document.getElementById('button-dashbord');
    let buttonComapains = document.getElementById('button-comapains');
    let buttonCampaignRequests = document.getElementById('button-campaign-requests');
    let buttonCampaignerRoleRequests = document.getElementById('button-campaigner-role-requests');
    const btnsSidebar = document.querySelectorAll('.nav-link');
    const contents = document.querySelectorAll('.content')
    let mainContent = document.getElementById('main-content');
    let comapainsContent = document.getElementById('comapaigns-content');
    let comapaignersContent = document.getElementById('comapaigners-content');
    let tbodyMainContent = document.getElementById('tbody-main-content');
    let tbodyComapaignersContent = document.getElementById('tbody-comapainers-content');
    let tbodyComapaignsContent = document.getElementById('tbody-comapaigns-content');
    let roleSelect = document.getElementById('roleSelect');
    let inputSearch = document.getElementById('inputSearch');
    let buttonSearch = document.getElementById('buttonSearch');
    let inputSearchComapainers = document.getElementById('inputSearchComapainers');
    let buttonSearchComapainers = document.getElementById('buttonSearchComapainers');
    let inputSearchComapains = document.getElementById('inputSearchComapains');
    let buttonSearchComapains = document.getElementById('buttonSearchComapains');
    let valueDonations = document.getElementById('valueDonations');
    let valueUsers = document.getElementById('valueUsers');
    let valueCampigns = document.getElementById('valueCampigns');
    let divPopup = document.getElementById('divPopup');
    let popupClose = document.getElementById('popupClose');
    let popupEmail = document.getElementById('popupEmail');
    let popupBan = document.getElementById('popupBan');
    let popupDelete = document.getElementById('popupDelete');
    let popupName = document.getElementById('popupName');
    let usersData = [];
    let comapaignsData = [];
    let comapaignersData = [];


    buttonDashbord.classList.add("active");
    mainContent.style.display = "block";
    usersData = getDataDisplayDashBord(tbodyMainContent, valueUsers, valueCampigns, valueDonations);

    // buttonDashbord.classList.add("active");
    // mainContent.style.display = "block";
    // fetchJSONData('http://localhost:3000/users').then(data => {
    //     tbodyMainContent.innerHTML = '';
    //     usersData = [];
    //     console.log(data);
    //     for (let i = 0; i < data.length; ++i) {
    //         usersData.push(data[i]);
    //         tbodyMainContent.appendChild(createTableUser(data[i]));

    //     }

    //     valueUsers.innerText = usersData.length;
    // });
    // fetchJSONData("http://localhost:3000/campaigns").then(data => {
    //     valueCampigns.innerText = data.length;
    // });
    // fetchJSONData("http://localhost:3000/pledges").then(data => {
    //     let money = 0;
    //     for (let i = 0; i < data.length; ++i) {
    //         money = money + data[i].amount;
    //     }
    //     valueDonations.innerText = `$${money}`;
    // });

    buttonSearch.addEventListener('click', function () {
        if (inputSearch.value == '') {
            console.log('nullll');
        } else {
            const result = usersData.filter(user =>
                user.email.includes(inputSearch.value)
            );
            console.log(result);
            tbodyMainContent.innerHTML = '';
            for (let i = 0; i < result.length; ++i) {
                tbodyMainContent.appendChild(createTableUser(result[i]));
            }
        }
    });//search

    buttonSearchComapains.addEventListener('click', function () {
        if (inputSearchComapains.value == '') {
            console.log('nullll');
        } else {
            const result = comapaignsData.filter(comapaign =>
                comapaign.title.includes(inputSearchComapains.value)
            );
            console.log(result);
            tbodyComapaignsContent.innerHTML = '';
            for (let i = 0; i < result.length; ++i) {
                tbodyComapaignsContent.appendChild(createTableCompains(result[i]));
            }
        }
    });// search compaigns

    buttonSearchComapainers.addEventListener('click',function(){
        if (inputSearchComapainers.value == '') {
            console.log('nullll');
        } else {
            const result = comapaignersData.filter(user =>
                user.email.includes(inputSearch.value)
            );
            console.log(result);
            tbodyComapaignersContent.innerHTML = '';
            for (let i = 0; i < result.length; ++i) {
                tbodyComapaignersContent.appendChild(createTableUser(result[i]));
            }
        }
    });// btn search compaigners

    buttonDashbord.addEventListener('click', function () {
        removeClass(btnsSidebar, 'active');
        none(contents);
        buttonDashbord.classList.add("active");
        mainContent.style.display = "block";
        usersData = getDataDisplayDashBord(tbodyMainContent, valueUsers, valueCampigns, valueDonations);

    });// btn dashbord

    buttonCampaignerRoleRequests.addEventListener('click', function () {
        removeClass(btnsSidebar, 'active');
        none(contents);
        buttonCampaignerRoleRequests.classList.add("active");
        comapaignersContent.style.display = "block";
        fetchJSONData('http://localhost:3000/users').then(data => {
            tbodyComapaignersContent.innerHTML = '';
            for (let i = 0; i < data.length; ++i) {
                if (data[i].role == "campaigner") {
                    if (!data[i].isApproved) {
                        comapaignersData.push(data[i]);
                        tbodyComapaignersContent.appendChild(createTableUser(data[i]));
                    }
                }

            }
        });


    })// btn campigner req

    roleSelect.addEventListener('change', function () {
        console.log(this.value);
        tbodyMainContent.innerHTML = '';
        switch (this.value) {
            case 'admin':
                for (let i = 0; i < usersData.length; ++i) {
                    if (usersData[i].role == 'admin') {
                        tbodyMainContent.appendChild(createTableUser(usersData[i]));
                    }

                }
                break;
            case "backer":
                for (let i = 0; i < usersData.length; ++i) {
                    if (usersData[i].role == 'backer') {
                        tbodyMainContent.appendChild(createTableUser(usersData[i]));
                    }

                }
                break;
            case "campaigner":
                for (let i = 0; i < usersData.length; ++i) {
                    if (usersData[i].role == 'campaigner') {
                        tbodyMainContent.appendChild(createTableUser(usersData[i]));
                    }

                }
                break;
            case "ban":
                for (let i = 0; i < usersData.length; ++i) {
                    if (usersData[i].isActive == false) {
                        tbodyMainContent.appendChild(createTableUser(usersData[i]));
                    }

                }
                break;

            default:

                break;
        }
    });// role selector

    buttonComapains.addEventListener('click', function () {
        removeClass(btnsSidebar, 'active');
        none(contents);
        this.classList.add("active");
        comapainsContent.style.display = "block";
        fetchJSONData('http://localhost:3000/campaigns').then(data => {
            tbodyComapaignsContent.innerHTML = '';

            console.log(data);
            for (let i = 0; i < data.length; ++i) {

                if (data[i].isApproved) {
                    comapaignsData.push(data[i]);
                    tbodyComapaignsContent.appendChild(createTableCompains(data[i]));
                }


            }
        })

    });// btn compains

    buttonCampaignRequests.addEventListener('click', function () {
        removeClass(btnsSidebar, 'active');
        none(contents);
        this.classList.add("active");
        comapainsContent.style.display = "block";
        fetchJSONData('http://localhost:3000/campaigns').then(data => {
            tbodyComapaignsContent.innerHTML = '';

            console.log(data);
            for (let i = 0; i < data.length; ++i) {
                if (!data[i].isApproved) {
                    comapaignsData.push(data[i]);
                    tbodyComapaignsContent.appendChild(createTableCompains(data[i]));
                }

            }
        })
    });// btn compaign req








});//load
