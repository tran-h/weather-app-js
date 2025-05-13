import clearDay from "./assets/images/clear-day.svg";
import clearNight from "./assets/images/clear-night.svg";
import cloudy from "./assets/images/cloudy.svg";
import fog from "./assets/images/fog.svg";
import hail from "./assets/images/hail.svg";
import partlyCloudyDay from "./assets/images/partly-cloudy-day.svg";
import partlyCloudyNight from "./assets/images/partly-cloudy-night.svg";
import rainSnowShowersDay from "./assets/images/rain-snow-showers-day.svg";
import rainSnowShowersNight from "./assets/images/rain-snow-showers-night.svg";
import rainSnow from "./assets/images/rain-snow.svg";
import rain from "./assets/images/rain.svg";
import showersDay from "./assets/images/showers-day.svg";
import showersNight from "./assets/images/showers-night.svg";
import sleet from "./assets/images/sleet.svg";
import snowShowersDay from "./assets/images/snow-showers-day.svg";
import snowShowersNight from "./assets/images/snow-showers-night.svg";
import snow from "./assets/images/snow.svg";
import thunderRain from "./assets/images/thunder-rain.svg";
import thunderShowersDay from "./assets/images/thunder-showers-day.svg";
import thunderShowersNight from "./assets/images/thunder-showers-night.svg";
import thunder from "./assets/images/thunder.svg";
import wind from "./assets/images/wind.svg";

export function getIcon(icon) {
  let imgSrc = "";
  switch (icon) {
    case "clear-day":
      imgSrc = clearDay;
      break;
    case "clear-night":
      imgSrc = clearNight;
      break;
    case "cloudy":
      imgSrc = cloudy;
      break;
    case "fog":
      imgSrc = fog;
      break;
    case "hail":
      imgSrc = hail;
      break;
    case "partly-cloudy-day":
      imgSrc = partlyCloudyDay;
      break;
    case "partly-cloudy-night":
      imgSrc = partlyCloudyNight;
      break;
    case "rain-snow-showers-day":
      imgSrc = rainSnowShowersDay;
      break;
    case "rain-snow-showers-night":
      imgSrc = rainSnowShowersNight;
      break;
    case "rain-snow":
      imgSrc = rainSnow;
      break;
    case "rain":
      imgSrc = rain;
      break;
    case "showers-day":
      imgSrc = showersDay;
      break;
    case "showers-night":
      imgSrc = showersNight;
      break;
    case "sleet":
      imgSrc = sleet;
      break;
    case "snow-showers-day":
      imgSrc = snowShowersDay;
      break;
    case "snow-showers-night":
      imgSrc = snowShowersNight;
      break;
    case "snow":
      imgSrc = snow;
      break;
    case "thunder-rain":
      imgSrc = thunderRain;
      break;
    case "thunder-showers-day":
      imgSrc = thunderShowersDay;
      break;
    case "thunder-showers-night":
      imgSrc = thunderShowersNight;
      break;
    case "thunder":
      imgSrc = thunder;
      break;
    case "wind":
      imgSrc = wind;
      break;
    default:
      break;
  }
  return imgSrc;
}
