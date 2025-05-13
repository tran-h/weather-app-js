import "./styles.css";
import { getIcon } from "./images.js";

const KEY = "6SSCJH2KBN6AFWSKY27Y844EU"; //free tier visual crossing account API
const weatherDataDiv = document.querySelector(".weather-data-div");
const currentForecastContainer = document.querySelector(
  ".current-forecast-container",
);
const searchBox = document.querySelector("#search-box");
const searchBtn = document.querySelector("#search-btn");

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

    //clear views before loading new data
    currentForecastContainer.innerHTML = "";
    weatherDataDiv.innerHTML = "";

    //forecast for today
    const currentForecastDiv = document.createElement("div");
    currentForecastDiv.classList.add("weather-day-div");

    const currentDateDiv = document.createElement("div");
    currentDateDiv.classList.add("date-div");
    currentDateDiv.textContent = "Today";

    const currentInfoDiv = document.createElement("div");
    currentInfoDiv.classList.add("info-div");

    const currentImgDiv = document.createElement("img");
    currentImgDiv.src = getIcon(data.days[0].icon);

    const currentTempDiv = document.createElement("div");
    currentTempDiv.classList.add("temp-div");
    currentTempDiv.textContent = `${data.days[0].temp} F`;

    const currentExtraInfoDiv = document.createElement("div");
    currentExtraInfoDiv.classList.add("extra-info-div");

    const currentConditionsDiv = document.createElement("div");
    currentConditionsDiv.textContent = `${data.days[0].conditions}`;

    const currentFeelsDiv = document.createElement("div");
    currentFeelsDiv.textContent = `Feels: ${data.days[0].feelslike} F`;

    const currentHighLowDiv = document.createElement("div");
    currentHighLowDiv.textContent = `H: ${data.days[0].tempmax} F, L: ${data.days[0].tempmin} F`;

    currentExtraInfoDiv.append(currentConditionsDiv);
    currentExtraInfoDiv.append(currentFeelsDiv);
    currentExtraInfoDiv.append(currentHighLowDiv);
    currentInfoDiv.append(currentImgDiv);
    currentInfoDiv.append(currentTempDiv);
    currentInfoDiv.append(currentExtraInfoDiv);
    currentForecastDiv.append(currentDateDiv);
    currentForecastDiv.append(currentInfoDiv);
    currentForecastContainer.append(currentForecastDiv);

    //forecast for next 5 days
    for (let i = 1; i < 6; i++) {
      const weatherDayDiv = document.createElement("div");
      weatherDayDiv.classList.add("weather-day-div");

      const dateDiv = document.createElement("div");
      dateDiv.classList.add("date-div");
      dateDiv.textContent = new Date(
        data.days[i].datetimeEpoch * 1000,
      ).toDateString();

      const infoDiv = document.createElement("div");
      infoDiv.classList.add("info-div");

      const imgDiv = document.createElement("img");
      imgDiv.src = getIcon(data.days[i].icon);

      const tempDiv = document.createElement("div");
      tempDiv.classList.add("temp-div");
      tempDiv.textContent = `${data.days[i].temp} F`;

      const extraInfoDiv = document.createElement("div");
      extraInfoDiv.classList.add("extra-info-div");

      const conditionsDiv = document.createElement("div");
      conditionsDiv.textContent = `${data.days[i].conditions}`;

      const feelsDiv = document.createElement("div");
      feelsDiv.textContent = `Feels: ${data.days[i].feelslike} F`;

      const highLowDiv = document.createElement("div");
      highLowDiv.textContent = `H: ${data.days[i].tempmax} F, L: ${data.days[i].tempmin} F`;

      extraInfoDiv.append(conditionsDiv);
      extraInfoDiv.append(feelsDiv);
      extraInfoDiv.append(highLowDiv);
      infoDiv.append(imgDiv);
      infoDiv.append(tempDiv);
      infoDiv.append(extraInfoDiv);
      weatherDayDiv.append(dateDiv);
      weatherDayDiv.append(infoDiv);
      weatherDataDiv.append(weatherDayDiv);
    }
  } catch (error) {
    alert(error.message);
  }
}

searchBtn.onclick = function () {
  getWeather(searchBox.value);
  searchBox.value = "";
};
