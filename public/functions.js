export function removeClass(elements, className) {
    elements.forEach(el => {
        el.classList.remove(className);
    });
}

export function none(elements,) {
    elements.forEach(el => {
        el.style.display = 'none';
    });
}

// export async function fetchJSONData(url) {
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         // console.log(data);
//         return data;
//     } catch (error) {
//         console.error('Failed to fetch data:', error);

//     }
// }

export async function fetchJSONData(url, method = 'GET', body = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        if (response.status !== 204) {
            return await response.json();
        } else {
            return null;
        }

    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
}


export async function deleteUser(id) {
    if (id !== null) {
        await fetchJSONData(`http://localhost:3000/users/${id}`, 'DELETE').then(data => {
            console.log(data);
        });
    }


}


export function createTableUser(obj) {
    let createTr = document.createElement('tr');

    let createTdid = document.createElement('td');
    createTdid.innerText = obj.id;
    createTr.appendChild(createTdid);

    let createTdname = document.createElement('td');
    createTdname.innerText = obj.name;
    createTr.appendChild(createTdname);

    let createTdemail = document.createElement('td');
    createTdemail.innerText = obj.email;
    createTr.appendChild(createTdemail);

    let createTdrole = document.createElement('td');
    createTdrole.innerText = obj.role;
    createTr.appendChild(createTdrole);

    createTr.addEventListener('click', function () {
        divPopup.style.display = 'block';
        popupName.innerText = obj.name;
        popupEmail.innerText = obj.email;
        popupEmail.style.display = 'block';
        popupBan.style.display = 'inline';

        popupBan.className = "btn btn-warning";
        if (!obj.isActive) {
            popupBan.innerText = 'unban';
        } else {
            popupBan.innerText = 'ban';
        }
        popupBan.addEventListener('click', function () {
            if (confirm("Are you sure you want to ban this user?")) {
                fetchJSONData(`http://localhost:3000/users/${obj.id}`, 'PATCH', { "isActive": !obj.isActive, }).then(() => {
                    location.reload();
                });
            }

        });

        if (obj.role == "campaigner" && obj.isApproved==false) {
            popupBan.style.display = 'inline';
            popupBan.className = "btn btn-success";
            popupBan.innerText = "accept";
            popupBan.addEventListener('click', function () {
                fetchJSONData(`http://localhost:3000/users/${obj.id}`, 'PATCH', { "isApproved": true }).then(() => {
                    location.reload();
                });
            })// pop accept
        }

        popupClose.addEventListener('click', function () {
            divPopup.style.display = 'none';
        });

        popupDelete.addEventListener('click', function () {
            if (confirm("Are you sure you want to delete this user?")) {
                fetchJSONData(`http://localhost:3000/users/${obj.id}`, 'DELETE').then(() => {
                    location.reload();
                });
            }

        });
    });

    return createTr;
}

export function createTableCompains(obj) {
    let createTr = document.createElement('tr');

    let createTdid = document.createElement('td');
    createTdid.innerText = obj.id;
    createTr.appendChild(createTdid);

    let createTdtitle = document.createElement('td');
    createTdtitle.innerText = obj.title;
    createTr.appendChild(createTdtitle);

    let createTdgoal = document.createElement('td');
    createTdgoal.innerText = obj.goal;
    createTr.appendChild(createTdgoal);

    let createTddeadline = document.createElement('td');
    createTddeadline.innerText = obj.deadline;
    createTr.appendChild(createTddeadline);

    createTr.addEventListener('click', function () {
        divPopup.style.display = 'block';
        popupName.innerText = obj.title;
        popupEmail.style.display = 'none';
        if (obj.isApproved) {
            popupBan.style.display = 'none';
        }
        else {
            popupBan.style.display = 'inline';
            popupBan.className = "btn btn-success";
            popupBan.innerText = "accept";
            popupBan.addEventListener('click', function () {
                fetchJSONData(`http://localhost:3000/campaigns/${obj.id}`, 'PATCH', { "isApproved": true }).then(() => {
                    location.reload();
                });
            })// pop accept
        }


        popupClose.addEventListener('click', function () {
            divPopup.style.display = 'none';
        });



        popupDelete.addEventListener('click', function () {
            if (confirm("Are you sure you want to delete this campaigns ?")) {
                fetchJSONData(`http://localhost:3000/campaigns/${obj.id}`, 'DELETE').then(() => {
                    location.reload();
                });
            }

        });
    });

    return createTr;
}

export function getDataDisplayDashBord(tbodyMainContent, valueUsers, valueCampigns, valueDonations) {
    let usersData = [];

    fetchJSONData('http://localhost:3000/users').then(data => {
        tbodyMainContent.innerHTML = '';

        console.log(data);
        for (let i = 0; i < data.length; ++i) {
            usersData.push(data[i]);
            tbodyMainContent.appendChild(createTableUser(data[i]));

        }

        valueUsers.innerText = usersData.length;
    });
    fetchJSONData("http://localhost:3000/campaigns").then(data => {
        valueCampigns.innerText = data.length;
    });
    fetchJSONData("http://localhost:3000/pledges").then(data => {
        let money = 0;
        for (let i = 0; i < data.length; ++i) {
            money = money + data[i].amount;
        }
        valueDonations.innerText = `$${money}`;
    });
    console.log(usersData);
    return usersData;
}