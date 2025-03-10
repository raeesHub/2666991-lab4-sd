document.getElementById('submit-btn').addEventListener('click', getCountryInfo);

function getCountryInfo() {
    const countryName = document.getElementById('country-name').value.trim();

    if (!countryName) {
        alert("Please enter a country name.");
        return;
    }

    document.getElementById('country-info').innerHTML = '<h2>Country Information</h2>';
    document.getElementById('bordering-countries').innerHTML = '<h2>Bordering Countries</h2><ul></ul>';

    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 404) {
                alert("Country not found! Please try again.");
                return;
            }

            const country = data[0];
            displayCountryInfo(country);
            displayBorderingCountries(country);
        })
        .catch(error => {
            console.error("Error fetching country data:", error);
            alert("An error occurred while fetching the data. Please try again later.");
        });
}

function displayCountryInfo(country) {
    const countryInfoSection = document.getElementById('country-info');
    
    const countryName = country.name.common;
    const capital = country.capital ? country.capital[0] : 'Not available';
    const population = country.population ? country.population.toLocaleString() : 'Not available';
    const region = country.region ? country.region : 'Not available';
    const flag = country.flags.svg;

    countryInfoSection.innerHTML += `
        <p><strong>Country:</strong> ${countryName}</p>
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>Population:</strong> ${population}</p>
        <p><strong>Region:</strong> ${region}</p>
        <p><strong>Flag:</strong><br><img src="${flag}" alt="Flag of ${countryName}" class="flag-img"></p>
    `;
}

function displayBorderingCountries(country) {
    const borderingCountriesSection = document.getElementById('bordering-countries');
    
    const borders = country.borders;
    if (!borders) {
        borderingCountriesSection.innerHTML += '<p>No bordering countries available.</p>';
        return;
    }

    const ul = borderingCountriesSection.querySelector('ul');
    
    borders.forEach(border => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then(response => response.json())
            .then(borderCountryData => {
                const borderCountry = borderCountryData[0];
                const borderCountryName = borderCountry.name.common;
                const borderCountryFlag = borderCountry.flags.svg;
                const li = document.createElement('li');
                li.innerHTML = `
                    <img src="${borderCountryFlag}" alt="Flag of ${borderCountryName}" class="border-flag">
                    ${borderCountryName}
                `;
                ul.appendChild(li);
            })
            .catch(error => {
                console.error("Error fetching bordering country data:", error);
            });
    });
}

window.onload = function() {
    document.getElementById('country-name').value = '';
};



