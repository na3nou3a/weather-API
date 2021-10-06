import get from "./utils/getElement";

/*======== HTML ELEMENTS ========*/
const form = get("search-form");
const input = form.querySelector(".input");
const container = document.querySelector(".alert-container");
const alert = container.querySelector(".alert");

/*======== Events ========*/
window.addEventListener("DOMContentLoaded", () => {
  requestApi("london");
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const city = input.value;
  requestApi(city);
  form.reset();
});

/*======== Functions ========*/

function requestApi(city) {
  const wUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=22c9e65da3d65df650b044a9b68312cb`;

  const fUrl = `https://api.openweathermap.org/data/2.5/forecast/?q=${city}&cnt=3&units=metric&appid=22c9e65da3d65df650b044a9b68312cb`;

  alertPending();
  const wData = fetchData(wUrl)
    .then((data) => displayWeather(data))
    .catch((error) => console.log(error));

  const fData = fetchData(fUrl)
    .then((data) => displayForcast(data))
    .catch((error) => console.log(error));
}

// alert messages
function alertError(txt) {
  alert.textContent = txt;
  alert.classList.replace("pending", "error");
}

function alertPending() {
  alert.textContent = "Getting weather details...";
  if (alert.classList.contains("error")) {
    alert.classList.replace("error", "pending");
  } else {
    alert.classList.add("pending");
  }
}

// fetch data from api
async function fetchData(url) {
  try {
    const data = await fetch(url, { mode: "cors" });
    const response = await data.json();
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    alertError("Something went wrong");
  }
}

// display weather
function displayWeather(wobj) {
  const { cod } = wobj;
  if (cod == "404") {
    alertError("please enter a valid city name!");
    return;
  }

  alert.classList.remove("pending");

  const city = wobj.name;
  const { country } = wobj.sys;
  const { temp, humidity } = wobj.main;
  const wind = wobj.wind.speed;
  const description = wobj.weather[0].description;
  const ic = wobj.weather[0].icon;
  // html
  const cpara = get("city");
  const tpara = get("temp");
  const wpara = get("wind");
  const hpara = get("humidity");
  const dpara = get("description");
  const icon = get("wicon");

  cpara.textContent = `City: ${city}, ${country}`;
  tpara.textContent = `Temp: ${temp}°`;
  wpara.textContent = `Wind: ${wind} meter/s`;
  hpara.textContent = `Humidity: ${humidity}%`;
  dpara.textContent = description;
  icon.src = `http://openweathermap.org/img/wn/${ic}@2x.png`;
}

// display forcast
function displayForcast(fobj) {
  // day1
  const { temp: temp1 } = fobj.list[0].main;
  const { description: desc1, icon: ic1 } = fobj.list[0].weather[0];
  // day2
  const { temp: temp2 } = fobj.list[1].main;
  const { description: desc2, icon: ic2 } = fobj.list[1].weather[0];
  // day3
  const { temp: temp3 } = fobj.list[2].main;
  const { description: desc3, icon: ic3 } = fobj.list[2].weather[0];
  // html  for forcast weather
  const tpara1 = get("ftemp1");
  const tpara2 = get("ftemp2");
  const tpara3 = get("ftemp3");
  const dpara1 = get("fdescription1");
  const dpara2 = get("fdescription2");
  const dpara3 = get("fdescription3");
  const icon1 = get("ficon1");
  const icon2 = get("ficon2");
  const icon3 = get("ficon3");

  tpara1.textContent = `Temp: ${temp1}°`;
  tpara2.textContent = `Temp: ${temp2}°`;
  tpara3.textContent = `Temp: ${temp3}°`;

  dpara1.textContent = desc1;
  dpara2.textContent = desc2;
  dpara3.textContent = desc3;

  icon1.src = `http://openweathermap.org/img/wn/${ic1}@2x.png`;
  icon2.src = `http://openweathermap.org/img/wn/${ic2}@2x.png`;
  icon3.src = `http://openweathermap.org/img/wn/${ic3}@2x.png`;
}
