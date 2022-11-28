const loadPhones = async (searchText, dataLimit) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
        const data = await res.json();
        displayPhones(data.data, dataLimit);
    }
    catch (e) {
        console.log(e);
    }
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';

    // display only 9 phones:
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 9) {
        phones = phones.slice(0, 9);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    // no found message:
    const noFound = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noFound.classList.remove('d-none');
    }
    else {
        noFound.classList.add('d-none');
    }

    // display all phones:
    phones.forEach(phone => {
        // console.log(phone);
        const phonesDiv = document.createElement('div');
        phonesDiv.classList.add('col');
        phonesDiv.innerHTML = `
        <div class="card h-100 p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Phone Detail</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phonesDiv);
    })
    // stop spinner:
    toggleSpinner(false);
}

// phone search:
const processSearch = (dataLimit) => {
    // start spinner:
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

// search button:
document.getElementById('btn-search').addEventListener('click', function () {
    processSearch(9);
})

// search by pressing enter:
document.getElementById('search-field').addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        processSearch(9);
    }
})

// spinner:
const spinner = document.getElementById('spinner');
const toggleSpinner = (isLoading) => {
    if (isLoading) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}

// show all button:
document.getElementById('show-all').addEventListener('click', function () {
    processSearch();
})

const loadPhoneDetails = async (id) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
        const data = await res.json();
        displayPhoneDetails(data.data);
    }
    catch (e) {
        console.log(e);
    }
}

const displayPhoneDetails = phone => {
    // console.log(phone);
    const phoneTitle = document.getElementById('phoneDetailModalLabel');
    phoneTitle.innerText = phone.name;
    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.innerHTML = `
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Found Information'}</p>
        <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'Information Not Found'}</p>
        <p>Display Size: ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'Information Not Found'}</p>
    `;
}

loadPhones('phone');