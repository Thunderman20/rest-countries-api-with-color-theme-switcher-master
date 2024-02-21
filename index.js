let data;
const body = document.body;

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

const searchBar = document.getElementById("searchBar");
console.log(searchBar);
searchBar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const searchText = searchBar.value.trim().toLowerCase();
    const country = data.find((country) =>
      country.name.toLowerCase().includes(searchText)
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
function filter(data) {
  const selectedOption = FilterByRegion.value;

  const filteredData = data.filter(
    (country) => country.region === selectedOption
  );
  
    console.log("filter");

  return filteredData;
}

function createCountryElements(data) {
  const countryInfoContainer = document.createElement("section");
countryInfoContainer.setAttribute("id", "countryInfoContainer");
  

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
  return countryInfoContainer;
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
    <span id="countryName">${country.name}</span>
    <span class="countryInfo" id="capital">Capital: ${country.capital}</span>
    <span class="countryInfo" id="region">Region: ${country.region}</span>
    <span class="countryInfo" id="population">Population: ${
      country.population
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
  <h1 id="DetailsCountryName">${country.name}</h1>
  <div id="statsContainer">
  
  <div id="DetailsCountryStats">
  <span id="DetailsCountryNativeName">Native Name: ${country.nativeName}</span>
  <span class="DetailsCountryInfo" id="population">Population: ${
    country.population
  }</span>
  <span class="DetailsCountryInfo" id="region">Region: ${country.region}</span>
  <span class="DetailsCountryInfo" id="subregion">Sub Region: ${
    country.subregion
  }</span>
  <span class="DetailsCountryInfo" id="capital">Capital: ${
    country.capital
  }</span>
  </div>
  <div id="DetailsCountryExtra">
  <span class="DetailsCountryInfoExtra" id="topLevelDomain">Top Level Domain: ${
    country.topLevelDomain
  }</span>
  <span class="DetailsCountryInfoExtra" id="currencies"> Currencies: ${country.currencies
    .map((currency) => currency.name)
    .join(", ")}</span>
  <span class="DetailsCountryInfoExtra" id="languages">Languages: ${country.languages
    .map((language) => language.name)
    .join(", ")}</span>
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

fetchData("data.json")
  .then((data) => {
   const countryInfoContainer = createCountryElements(data);
   body.appendChild(countryInfoContainer);
    FilterByRegion.addEventListener("change",()=>{
      body.removeChild(countryInfoContainer);
       data = filter(data);
    const newCountryInfoContainer =  createCountryElements(data);
    body.appendChild(newCountryInfoContainer);
    });
    
  })
  .catch((error) => console.error("Error:", error));
