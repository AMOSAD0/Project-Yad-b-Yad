import { removeClass, none, fetchJSONData, createTableUser, createTableCompains, getDataDisplayDashBord, createTablePledegs } from './functions.js';


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
    let buttonPledeges = document.getElementById('button-pledeges');
    let PledgesContent = document.getElementById('PledgesContent');
    let tbodyPledgesContent = document.getElementById('tbody-pledges-content');
    let buttonLogout = document.getElementById('buttonLogout');
    let userObj = JSON.parse(localStorage.getItem('userLocal'));
    let usersData = [];
    let comapaignsData = [];
    let comapaignersData = [];

    if (userObj) {
        switch (userObj.role) {
            case "admin":
                break;
            case "campaigner":
                window.location.href = "http://localhost:3000/compaignDashBoard.html";
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

    buttonDashbord.classList.add("active");
    mainContent.style.display = "block";
    usersData = getDataDisplayDashBord(tbodyMainContent, valueUsers, valueCampigns, valueDonations);


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

    buttonSearchComapainers.addEventListener('click', function () {
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

    buttonPledeges.addEventListener('click', function () {
        removeClass(btnsSidebar, 'active');
        none(contents);
        buttonPledeges.classList.add("active");
        PledgesContent.style.display = "block";
        fetchJSONData('http://localhost:3000/pledges').then(data => {
            tbodyPledgesContent.innerHTML = '';
            for (let i = 0; i < data.length; ++i) {
                let obj = {};
                obj.id = data[i].id;
                fetchJSONData(`http://localhost:3000/campaigns/${data[i].campaignId}`).then(dataCompaign => {
                    obj.campaignId = dataCompaign.title;
                    fetchJSONData(`http://localhost:3000/users/${data[i].userId}`).then(dataUser => {
                        obj.userId = dataUser.name;
                        obj.amount = data[i].amount;
                        tbodyPledgesContent.appendChild(createTablePledegs(obj));
                    });
                });
            }
        });
        // fetchJSONData('http://localhost:3000/users').then(data => {
        //     tbodyComapaignersContent.innerHTML = '';
        //     for (let i = 0; i < data.length; ++i) {
        //         if (data[i].role == "campaigner") {
        //             if (!data[i].isApproved) {
        // comapaignersData.push(data[i]);
        // tbodyComapaignersContent.appendChild(createTableUser(data[i]));
        //             }
        //         }

        //     }
        // });

    })// btn pledegs

    buttonLogout.addEventListener('click', function () {
        let confirmation = confirm("Are you sure you want to log out?");
        if (confirmation) {
            localStorage.removeItem("userLocal");
            window.location.href = "http://localhost:3000/index.html";
        }
    });// btn logout

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
