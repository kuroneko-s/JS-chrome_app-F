const weatherContent = document.querySelector(".js-weather");

const API_KEY = "f4315c6072147efa12747320bc02a892";
const COORDS = "coords";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temp = json.main.temp;
      const place = json.name;
      const placeSpan = document.createElement("span");
      const tempSpan = document.createElement("span");
      tempSpan.innerText = `온도 : ${temp}`;
      tempSpan.className = "css__temp";
      placeSpan.innerText = `장소 : ${place}`;
      placeSpan.className = "css__place";
      weatherContent.appendChild(tempSpan);
      weatherContent.appendChild(placeSpan);
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoErr() {
  console.log("Cant acess");
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoErr);
}

function loadCoords() {
  const loadedCords = localStorage.getItem(COORDS);
  if (loadedCords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
