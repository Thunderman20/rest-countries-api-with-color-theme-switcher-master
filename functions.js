// Function to fetch data from a given URL
async function fetchData(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return await Promise.reject(error);
  }
}

// Function to create country information elements and append them to the container
function createCountryElements(data) {
  const main = document.getElementById("main");
  const countryInfoContainer = document.createElement('section');
  countryInfoContainer.setAttribute("id", "countryInfoContainer");
  main.append(countryInfoContainer);
  data.forEach(country => {
    const countryInfoDiv = createCountryInfoDiv(country);
    countryInfoContainer.appendChild(countryInfoDiv);
  });
}

// Function to create country information div for each country
function createCountryInfoDiv(country) {
  const countryInfoDiv = document.createElement('div');
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

// Example usage
fetchData("data.json")
  .then(data => createCountryElements(data))
  .catch(error => console.error('Error:', error));
