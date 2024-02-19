// Function to fetch data from a given URL
function fetchData(url) {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching data:", error);
      return Promise.reject(error);
    });
}

// Function to create country information elements and append them to the container
function createCountryElements(data) {
  const main = document.getElementById("main");
  const countryInfoContainer = document.createElement("section");
  countryInfoContainer.setAttribute("id", "countryInfoContainer");
  main.append(countryInfoContainer);
  data.forEach((country) => {
    const countryInfoDiv = createCountryInfoDiv(country);
    countryInfoContainer.appendChild(countryInfoDiv);
    countryInfoDiv.addEventListener("click",()=>{
     const countryDetailsDiv =createDetailsPage(country);
     main.removeChild(countryInfoContainer);
     main.append(countryDetailsDiv);
      
    });
  });
}

// Function to create country information div for each country
function createCountryInfoDiv(country) {
  const countryInfoDiv = document.createElement("div");
  countryInfoDiv.setAttribute("id", "countryInfoDiv");
  countryInfoDiv.innerHTML = `
    <div id="imgContainer" style="background-image:Url(${country.flag})">
    
    </div>
    <div id="countryStats">
    <span id="countryName">${country.name}</span>
    <span class="countryInfo" id="capital">Capital: ${country.capital}</span>
    <span class="countryInfo" id="region">Region: ${country.region}</span>
    <span class="countryInfo" id="population">Population: ${country.population}</span>
    </div>
  `;
  
  return countryInfoDiv;
}
function createDetailsPage(country) {
  const countryDetailsDiv = document.createElement("section");
  countryDetailsDiv.setAttribute("id","countryDetailsDiv");
  countryDetailsDiv.innerHTML=`
  <div id="DetailsImgContainer" style="background-image:Url(${country.flag})">
  
  </div>
  <div id="statsContainer">
  
  <div id="DetailsCountryStats">
  <h1 id="DetailsCountryName">${country.name}</h1>
  <span id="DetailsCountryNativeName">Native Name: ${country.nativeName}</span>
  <span class="DetailsCountryInfo" id="population">Population: ${country.population}</span>
  <span class="DetailsCountryInfo" id="region">Region: ${country.region}</span>
  <span class="DetailsCountryInfo" id="subregion">Sub Region: ${country.subregion}</span>
  <span class="DetailsCountryInfo" id="capital">Capital: ${country.capital}</span>
  <div id="DetailsCountryNeighbors">
  <span  id="borderTag">Border Countries:</span>
  <span  id="borderCountries">${country.borders.join(', ')}</span>
  </div>
  </div>
  <div id="DetailsCountryExtra">
  <span class="DetailsCountryInfoExtra" id="topLevelDomain">Top Level Domain: ${country.topLevelDomain}</span>
  <span class="DetailsCountryInfoExtra" id="currencies"> Currencies: ${country.currencies.map(currency => currency.name).join(', ')}</span>
  <span class="DetailsCountryInfoExtra" id="languages">Languages: ${country.languages.map(language => language.name).join(', ')}</span>
  </div>
  </div>
  
`;
return countryDetailsDiv;

}

// Example usage
fetchData("data.json")
  .then((data) => createCountryElements(data))
  .catch((error) => console.error("Error:", error));
