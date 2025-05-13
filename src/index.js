import "./styles.css";
import { getIcon } from "./images.js";

const KEY = "6SSCJH2KBN6AFWSKY27Y844EU"; //free tier visual crossing account API
const weatherDataDiv = document.querySelector(".weather-data-div");
const currentForecastContainer = document.querySelector(
  ".current-forecast-container",
);
const searchBox = document.querySelector("#search-box");
const searchBtn = document.querySelector("#search-btn");
const convertBtn = document.querySelector("#convert-btn");
let currentUnits = "F"; //for determining which unit to convert to
let arrayOfTemps = []; //create an array of temps to make it easier to convert units later

function convertToCelsius(fahrenheit) {
  return Math.round((fahrenheit - 32) / 1.8);
}

function convertToFahrenheit(celsius) {
  return Math.round(celsius * 1.8 + 32);
}

function updateTempsDisplay() {
  const tmp = document.querySelectorAll(".temp-div");
  const feels = document.querySelectorAll(".feels-div");
  const highlow = document.querySelectorAll(".high-low-div");

  for (let i = 0; i < tmp.length; i++) {
    tmp[i].textContent = `${arrayOfTemps[i].temp} ${currentUnits}`;
    feels[i].textContent =
      `Feels: ${arrayOfTemps[i].feelslike} ${currentUnits}`;
    highlow[i].textContent =
      `H: ${arrayOfTemps[i].tempmax} ${currentUnits}, L: ${arrayOfTemps[i].tempmin} ${currentUnits}`;
  }
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

    //show convert temperature button only when data is present
    convertBtn.className = "active";

    //reset to default values so logic below works as intended
    arrayOfTemps = [];
    currentUnits = "F";

    //create an array of temps to make it easier to convert units later
    for (let i = 0; i < 6; i++) {
      const obj = {
        temp: data.days[i].temp,
        feelslike: data.days[i].feelslike,
        tempmax: data.days[i].tempmax,
        tempmin: data.days[i].tempmin,
      };
      arrayOfTemps.push(obj);
    }

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
    currentTempDiv.textContent = `${arrayOfTemps[0].temp} ${currentUnits}`;

    const currentExtraInfoDiv = document.createElement("div");
    currentExtraInfoDiv.classList.add("extra-info-div");

    const currentConditionsDiv = document.createElement("div");
    currentConditionsDiv.textContent = `${data.days[0].conditions}`;

    const currentFeelsDiv = document.createElement("div");
    currentFeelsDiv.classList.add("feels-div");
    currentFeelsDiv.textContent = `Feels: ${arrayOfTemps[0].feelslike} ${currentUnits}`;

    const currentHighLowDiv = document.createElement("div");
    currentHighLowDiv.classList.add("high-low-div");
    currentHighLowDiv.textContent = `H: ${arrayOfTemps[0].tempmax} ${currentUnits}, L: ${arrayOfTemps[0].tempmin} ${currentUnits}`;

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
      tempDiv.textContent = `${arrayOfTemps[i].temp} ${currentUnits}`;

      const extraInfoDiv = document.createElement("div");
      extraInfoDiv.classList.add("extra-info-div");

      const conditionsDiv = document.createElement("div");
      conditionsDiv.textContent = `${data.days[i].conditions}`;

      const feelsDiv = document.createElement("div");
      feelsDiv.classList.add("feels-div");
      feelsDiv.textContent = `Feels: ${arrayOfTemps[i].feelslike} ${currentUnits}`;

      const highLowDiv = document.createElement("div");
      highLowDiv.classList.add("high-low-div");
      highLowDiv.textContent = `H: ${arrayOfTemps[i].tempmax} ${currentUnits}, L: ${arrayOfTemps[i].tempmin} ${currentUnits}`;

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

    convertBtn.onclick = function () {
      if (currentUnits === "F") {
        let newTempsArray = [];
        for (let i = 0; i < arrayOfTemps.length; i++) {
          const newTempsObj = {
            temp: convertToCelsius(arrayOfTemps[i].temp),
            feelslike: convertToCelsius(arrayOfTemps[i].feelslike),
            tempmax: convertToCelsius(arrayOfTemps[i].tempmax),
            tempmin: convertToCelsius(arrayOfTemps[i].tempmin),
          };
          newTempsArray.push(newTempsObj);
        }
        arrayOfTemps = newTempsArray;
        currentUnits = "C";
        updateTempsDisplay();
      } else {
        let newTempsArray = [];
        for (let i = 0; i < arrayOfTemps.length; i++) {
          const newTempsObj = {
            temp: convertToFahrenheit(arrayOfTemps[i].temp),
            feelslike: convertToFahrenheit(arrayOfTemps[i].feelslike),
            tempmax: convertToFahrenheit(arrayOfTemps[i].tempmax),
            tempmin: convertToFahrenheit(arrayOfTemps[i].tempmin),
          };
          newTempsArray.push(newTempsObj);
        }
        arrayOfTemps = newTempsArray;
        currentUnits = "F";
        updateTempsDisplay();
      }
    };
  } catch (error) {
    alert(error.message);
  }
}

searchBtn.onclick = function () {
  getWeather(searchBox.value);
  searchBox.value = "";
};
