const KEY = "6SSCJH2KBN6AFWSKY27Y844EU"; //free tier visual crossing account
const weatherDataDiv = document.querySelector(".weather-data-div");
const searchBox = document.querySelector("#search-box");
const searchBtn = document.querySelector("#search-btn");

//TODO: button to toggle temp units
//TODO: images for each condition

function convertToCelsius(fahrenheit) {
  return Math.round((fahrenheit - 32) / 1.8);
}

async function getWeather(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw new Error(
            "BAD_REQUEST – The format of the API is incorrect or an invalid parameter or combination of parameters was supplied",
          );
        case 401:
          throw new Error(
            "UNAUTHORIZED – There is a problem with the API key, account or subscription.",
          );
        case 404:
          throw new Error(
            "NOT_FOUND – The request cannot be matched to any valid API request endpoint structure.",
          );
        case 429:
          throw new Error(
            "TOO_MANY_REQUESTS – The account has exceeded their assigned limits.",
          );
        case 500:
          throw new Error(
            "INTERNAL_SERVER_ERROR – A general error has occurred processing the request.",
          );
        default:
          break;
      }
    }
    const data = await response.json();
    for (let i = 1; i < 6; i++) {
        const weatherDayDiv = document.createElement("div");
        const dayDiv = document.createElement("p");
        dayDiv.textContent = new Date(data.days[i].datetimeEpoch * 1000).toDateString();
        const tempDiv = document.createElement("p");
        tempDiv.textContent = `Temperature: ${data.days[i].temp} F`;
        const tempMinDiv = document.createElement("p");
        tempMinDiv.textContent = `Low: ${data.days[i].tempmin} F`;
        const tempMaxDiv = document.createElement("p");
        tempMaxDiv.textContent = `High: ${data.days[i].tempmax} F`;
        const feelsDiv = document.createElement("p");
        feelsDiv.textContent = `Feels Like: ${data.days[i].feelslike} F`;
        const conditionsDiv = document.createElement("p");
        conditionsDiv.textContent = `Conditions: ${data.days[i].conditions}`;

        weatherDayDiv.append(dayDiv);
        weatherDayDiv.append(tempDiv);
        weatherDayDiv.append(tempMinDiv);
        weatherDayDiv.append(tempMaxDiv);
        weatherDayDiv.append(feelsDiv);
        weatherDayDiv.append(conditionsDiv);

        weatherDataDiv.append(weatherDayDiv);
    }
  } catch (error) {
    alert(error.message);
  }
}

searchBtn.onclick = function () {
  getWeather(searchBox.value);
};
