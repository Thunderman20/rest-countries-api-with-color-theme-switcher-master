let data;
const body = document.body;
const countryInfoContainer = document.createElement("section");
countryInfoContainer.setAttribute("id", "countryInfoContainer");

body.appendChild(countryInfoContainer);
const FilterByRegion = document.getElementById("FilterByRegion");
async function fetchData(url) {
  try {
    const response = await fetch(url);
    data = await response.json();
  
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return await Promise.reject(error);
  }
}
function getCurrencies(country) {
  // Check if the currencies object exists
  if (country.currencies) {
    // Extract currency names from the currencies object
    const currencyNames = Object.values(country.currencies).map(
      (currency) => currency.name
    );
    // Join currency names with comma separator
    return currencyNames.join(", ");
  } else {
    return "Unknown"; // or any default value if currencies are not available
  }
}
function getLanguages(country) {
  if (country.languages) {
    return Object.values(country.languages)
      .map((language) => language)
      .join(", ");
  } else {
    return "Unknown";
  }
}

function getTopLevelDomain(country) {
  if (country.tld) {
    return country.tld.join(", ");
  } else {
    return "Unknown";
  }
}
const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const searchText = searchBar.value.trim().toLowerCase();
    const country = data.find((country) =>
      country.name.common.toLowerCase().includes(searchText)
    );
    if (country) {
      const countryDetailsDiv = createDetailsPage(country);
      body.removeChild(countryInfoContainer);
      searchBar.remove();
      FilterByRegion.remove();
      body.append(countryDetailsDiv);
    }
  }
});

FilterByRegion.addEventListener("change", () => {
  const selectedOption = FilterByRegion.value;

  if (!selectedOption) {
    renderCards(data);
    return;
  }
  const filteredData = data.filter(
    (country) => country.region === selectedOption
  );

  renderCards(filteredData);
});
function renderCards(data) {
  countryInfoContainer.innerHTML = "";

  data.forEach((country) => {
    const countryInfoDiv = createCountryInfoDiv(country);
    countryInfoContainer.appendChild(countryInfoDiv);
    countryInfoDiv.addEventListener("click", () => {
      const countryDetailsDiv = createDetailsPage(country);
      body.removeChild(countryInfoContainer);
      body.append(countryDetailsDiv);
      searchBar.remove();
      FilterByRegion.remove();
    });
  });
}

function createCountryInfoDiv(country) {
  const countryInfoDiv = document.createElement("div");
  countryInfoDiv.setAttribute("id", "countryInfoDiv");
  countryInfoDiv.innerHTML = `
  <div id="imgContainer" style="background-image:Url(${
    country.flags.svg ? country.flags.svg : country.flag
  })">
    
  </div>
    <div id="countryStats">
    <span id="countryName">${country.name.common}</span>
    <span class="countryInfo" id="capital">Capital: ${country.capital}</span>
    <span class="countryInfo" id="region">Region: ${country.region}</span>
    <span class="countryInfo" id="population">Population: ${
      country.population ? country.population.toLocaleString() : "none"
    }</span>
   
    </div>
  `;

  return countryInfoDiv;
}
function createDetailsPage(country) {
  const countryDetailsDiv = document.createElement("section");
  countryDetailsDiv.setAttribute("id", "countryDetailsDiv");

  countryDetailsDiv.innerHTML = `
  
    <img id="DetailsImgContainer" src="${
      country.flags.svg ? country.flags.svg : country.flag
    }">
 
  <div id="statsWrapper">
  <h1 id="DetailsCountryName">${
    country.name.common ? country.name.common : "none"
  }</h1>
  <div id="statsContainer">
  
  <div id="DetailsCountryStats">
  <span class="DetailsCountryInfoExtra" id="nativeName"> Native Name: ${
    Object.values(country.name.nativeName)[0].common
  }</span>
  <span class="DetailsCountryInfo" id="population">Population: ${
    country.population ? country.population.toLocaleString() : "none"
  }</span>
  <span class="DetailsCountryInfo" id="region">Region: ${
    country.region ? country.region : "none"
  }</span>
  <span class="DetailsCountryInfo" id="subregion">Sub Region: ${
    country.subregion ? country.subregion : "none"
  }</span>
  <span class="DetailsCountryInfo" id="capital">Capital: ${
    country.capital ? country.capital : "none"
  }</span>
  </div>
  <div id="DetailsCountryExtra">
  <span class="DetailsCountryInfoExtra" id="topLevelDomain">Top Level Domain: ${
    country.tld ? country.tld.join(", ") : "none"
  }</span>
  <span class="DetailsCountryInfoExtra" id="currencies"> Currencies: ${
    country.currencies ? getCurrencies(country) : "none"
  }</span>
    
  <span class="DetailsCountryInfoExtra" id="languages">Languages: ${
    country.languages ? getLanguages(country) : "none"
  }</span>
 </span>
  </div>
  </div>
  <div id="DetailsCountryNeighbors">
  <span  id="borderTag">Border Countries:</span>
  <span  id="borderCountries">${
    country.borders ? country.borders.join(", ") : "none"
  }</span>
  </div>
  </div>
`;
  return countryDetailsDiv;
}

fetchData("https://restcountries.com/v3.1/all")
  .then((data) => renderCards(data))
  .catch((error) => console.error("Error:", error));

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
  body.classList.toggle("lightMode");
});

