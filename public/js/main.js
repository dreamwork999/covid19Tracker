// import DataChart from './Chart.js'
// import Map from "./Map.js";

// const Mapbox = new Map('map', 1, 'mapbox://styles/mapbox/dark-v10');


const collapseBtns = document.querySelectorAll(".collapseBtn");
const mapContainer = document.getElementById("mapCollapse");
const graphContainer = document.getElementById("graphCollapse");
// const ctx = document.getElementById('myChart').getContext('2d');
const searchInput = document.getElementById('countrySearch');

// const goToLocationOnMap = (long, lat) => {
//     Mapbox.showLocation(long, lat)
// };

const setListItemActiveState = (currentListItem) => {
    const countryListItems = document.querySelectorAll('.countryListItems');
    countryListItems.forEach(listItem => {
        if (listItem !== currentListItem.target.closest("li")) {

            listItem.classList.remove("active");
        } else {
            listItem.classList.add("active");
            getDetailInfo(listItem.firstChild.textContent.toLowerCase());
        }
    });
};

const renderDetails = (countryName, data) => {
    const countryDetailName = document.getElementById('countryDetailName');

    countryDetailName.innerText = countryName.toUpperCase();
};

const getDetailInfo = async (countryName) => {
    const res = await  fetch(`${window.location.href}api/cases/${countryName}`);

    const data = await res.json();

    renderDetails(countryName,data);
}

// const getDates = () => {
//     let date = new Date();
//
//     const dateArray = [];
//     const startDate = '2020-01-22';
//     const month = (date.getMonth() + 1 < 10) ? "0" + parseInt(date.getMonth() + 1) : parseInt(date.getMonth() + 1);
//     const day = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();
//     const year = date.getFullYear();
//     const dateMove = new Date(startDate)
//     const endDate = `${year}-${month}-${day}`;
//     let strDate = startDate;
//     while (strDate < endDate) {
//
//         strDate = dateMove.toISOString().slice(0, 10);
//         dateArray.push(strDate);
//         dateMove.setDate(dateMove.getDate() + 1);
//     }
//     return dateArray;
// };

// const parseArrayData = (dataArray) => {
//     const activeListItem = document.querySelector(".countryListItems.active");
//     const name = (activeListItem.dataset.province === "") ? activeListItem.dataset.country : activeListItem.dataset.province;
//
//     for (let i = 0; i < dataArray.length; i++) {
//         {
//             if (dataArray[i].name === name) {
//                 return dataArray[i].values
//             }
//         }
//     }
// };

// const initChart = () => {
//
//
//     Promise.all([
//         fetch(`${window.location.href}api/confirmed`).then(value => value.json()),
//         fetch(`${window.location.href}api/deaths`).then(value => value.json()),
//         fetch(`${window.location.href}api/recoveries`).then(value => value.json())
//     ])
//         .then((value) => {
//             const confirmedArray = value[0];
//             const deathsArray = value[1];
//             const recoveriesArray = value[2];
//
//             const conFirmedValues = parseArrayData(confirmedArray);
//             const deathValues = parseArrayData(deathsArray);
//             const recoveriesValues = parseArrayData(recoveriesArray);
//
//
//             Chart.clearChart();
//             Chart.updateChart('# of Cases', 'rgb(255, 193, 7)', conFirmedValues);
//             Chart.updateChart('# of Deaths', 'rgb(220, 53, 69)', deathValues);
//             Chart.updateChart('# of Recoveries', 'rgb(40, 167, 69)', recoveriesValues);
//
//
//         })
//         .catch((err) => {
//             console.log(err);
//         });
//
//
// };


const searchList = () => {

    const search = searchInput.value;




    const countryNames = document.querySelectorAll(".countryName");
    countryNames.forEach((name) => {
        const countryName = name.textContent.toLowerCase();
        const parent = name.parentElement;
        if (search.length > 0){
            if (countryName.toLowerCase().search(search) > 0){
                parent.style.display = "block"
            }else{
                parent.style.display = "none"
            }
        }else{
            parent.style.display = "block"
        }
    })

};

const renderData = (data) => {
    const countryCount = document.getElementById('countryCount');
    const totalCases = document.getElementById('totalCases');
    const totalDeaths = document.getElementById('totalDeaths');
    const totalRecoveries = document.getElementById('totalRecoveries');
    const countryList = document.getElementById('countryList');


    countryCount.innerText = data.casesByCountry.length -1;
    totalCases.innerText = data.totalCases;
    totalDeaths.innerText = data.totalDeaths ;
    totalRecoveries.innerText = data.totalRecoveries ;

    for (let i = 0; i < data.casesByCountry.length -1; i++){
        const li = document.createElement("li");
        const countryNameSpan = document.createElement('span');
        const badgeContainer = document.createElement('div');
        const totalCasesBadge = document.createElement('span');
        const totalDeathsBadge = document.createElement('span');
        const totalRecoveriesBadge = document.createElement('span');
        li.classList.add('list-group-item', 'countryListItems');
        countryNameSpan.classList.add("font-weight-bold","countryName");
        countryNameSpan.innerText = data.casesByCountry[i].name;

        totalCasesBadge.classList.add("badge", "badge-warning", "badge-pill", "ml-1");
        totalDeathsBadge.classList.add("badge", "badge-danger", "badge-pill", "ml-1");
        totalRecoveriesBadge.classList.add("badge", "badge-success", "badge-pill", "ml-1");

        totalCasesBadge.innerText = data.casesByCountry[i].totalCases;
        totalDeathsBadge.innerText = data.casesByCountry[i].totalDeaths;
        totalRecoveriesBadge.innerText = data.casesByCountry[i].totalRecoveries;

        badgeContainer.appendChild(totalCasesBadge);
        badgeContainer.appendChild(totalDeathsBadge);
        badgeContainer.appendChild(totalRecoveriesBadge);

        li.appendChild(countryNameSpan);
        li.appendChild(badgeContainer);

        li.style.pointer = 'cursor';

        li.addEventListener("click", (countryListItem) => {
            setListItemActiveState(countryListItem);
        });
        countryList.appendChild(li);
    }
};

const initData = async () => {
    const res = await fetch(`${window.location.href}api/currentstatus`)
    try {
        const spinners = document.querySelectorAll('.fa-circle-notch');
        const data = await res.json();

        spinners.forEach(el => {
            el.style.display = 'none';
        });

        renderData(data);
    }catch (e) {
        console.error(e)
    }

};

// const statCounter = () => {
//     const counters = document.querySelectorAll('.counter');
//     const speed = 200;
//
//
//     counters.forEach(counter => {
//
//         const updateCount = () => {
//             const target = parseInt(counter.dataset.target);
//             const count = parseInt(counter.innerText);
//
//             const inc = target / speed;
//
//             if (count < target) {
//                 counter.innerText = Math.ceil(count + inc);
//                 setTimeout(updateCount, 1);
//             } else {
//                 counter.innerText = target
//             }
//         };
//         updateCount()
//     })
//
// };


// const options = {
//     type: 'line',
//     data: {
//         labels: getDates()
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// };
// const Chart = new DataChart(ctx, options);

// Mapbox.init();
// collapseBtns.forEach(collapseBtn => {
//     collapseBtn.addEventListener("click", collapseBtn => {
//         let collapseTarget = collapseBtn.target.dataset.target;
//         collapseTarget = collapseTarget.substring(1);
//         const allCollapseFields = document.querySelectorAll(".collapse");
//
//         allCollapseFields.forEach(field => {
//             if (field.id !== collapseTarget) {
//                 if (field.classList.contains("show")) {
//                     field.classList.remove("show")
//                 }
//                 if (collapseTarget === "graphCollapse") {
//                     initChart();
//                 }
//
//             }
//         });
//
//     });
// });

searchInput.addEventListener("keyup", searchList);
window.onload = () => {
    // statCounter();
    initData();
};
if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js');
    });
}