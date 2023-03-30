function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDays[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.time * 1000
  );
}

let apiKey = "372b3246a78f090c2oeea103eb8344t0";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=New York&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);
