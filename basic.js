fetch("data.json")
.then(response => response.json())
.then(data => {
  const main=document.getElementById("main");
  const countryInfoContainer = document.createElement('section');
  countryInfoContainer.setAttribute("id","countryInfoContainer")
  main.append(countryInfoContainer);
  data.forEach(country => {
    const countryInfoDiv = document.createElement('div');
    countryInfoDiv.setAttribute("id","countryInfoDiv");
    countryInfoDiv.innerHTML = `
      <div id="imgContainer" style="background-image:Url(${country.flag})">
      
      </div>
      <div id="countryStats">
      <span id="countryName">${country.name}</span>
      <span class="countryInfo"id="capital">Capital: ${country.capital}</span>
      <span class="countryInfo"id="region">Region: ${country.region}</span>
      <span class="countryInfo"id="population">Population: ${country.population}</span>
      </div>
    `;
    countryInfoContainer.appendChild(countryInfoDiv);
  });
})
.catch(error => console.error('Error fetching data:', error));