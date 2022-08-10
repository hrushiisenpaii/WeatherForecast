const api = {
  key: "d9ce6471d8fd9d6527e5201cd8b8077e",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();

    }).then(displayResults);
}

function displayResults (weather) {
  console.log(weather);

  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.current .hi-low');
  hilow.innerHTML = `${Math.round(weather.main.temp_min)}<span>°c</span> / ${Math.round(weather.main.temp_max)}<span>°c</span>`;

  let lonlat = document.querySelector('.coordinate');
  lonlat.innerText = `Longitude: ${weather.coord.lon}, Latitude: ${weather.coord.lat}`;

  let spedeg = document.querySelector('.wind');
  spedeg.innerText = `Wind-Speed: ${weather.wind.speed} mps | Deg: ${weather.wind.deg} `;

   let humid = document.querySelector('.extra .humidity');
  humid.innerText = `Humidity: ${weather.main.humidity}%`;
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}

document.addEventListener("DOMContentLoaded",
  function (event){

  var span = document.getElementById('time');

  function time() {
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
  span.textContent = 
    ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2) + " IST";
}

setInterval(time, 1000);

  getResults("Delhi");

});