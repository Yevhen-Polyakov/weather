
const apiKey = 'c9d724d9060e483eaf9122257241304';

// Define constants for the icon names
const ICON_CLEAR = 'clear.png';
const ICON_CLOUD_SUNNY = 'cloud-sunny.png';
const ICON_CLOUDY = 'cloudy.png';
const ICON_RAIN = 'rain.png';
const ICON_SNOW = 'snow.png';

// Define a mapping from condition codes to weather icons
const WEATHER_ICONS = {
    1000: ICON_CLEAR,
    1003: ICON_CLOUD_SUNNY,
    1006: ICON_CLOUDY,
    1009: ICON_CLOUDY,
    1063: ICON_RAIN,
    1066: ICON_SNOW,
    1114: ICON_SNOW,
    1180: ICON_RAIN,
    1183: ICON_RAIN,
    1186: ICON_RAIN,
    1189: ICON_RAIN,
    1192: ICON_RAIN,
    1195: ICON_RAIN,
    1198: ICON_RAIN,
    1201: ICON_RAIN,
    1210: ICON_SNOW,
    1213: ICON_SNOW,
    1216: ICON_SNOW,
    1219: ICON_SNOW,
    1222: ICON_SNOW,
    1225: ICON_SNOW,
    1237: ICON_SNOW,
    1240: ICON_RAIN,
    1243: ICON_RAIN,
    1246: ICON_RAIN,
    1249: ICON_RAIN,
    1255: ICON_SNOW,
    1258: ICON_SNOW,
    1261: ICON_SNOW,
    1264: ICON_SNOW,
    1276: ICON_RAIN,
    1279: ICON_SNOW,
    // ... add more mappings as needed
};


const header = document.querySelector('.header');
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const img = document.querySelector('.card-img');

function removCard(){
    const prevCard = document.querySelector('.card');
    if (prevCard) prevCard.remove();
}

function showError(erroeMessage) {
    const html = `<div class="card">${erroeMessage}</div>`;
    header.insertAdjacentHTML('afterend', html);
    
}




function showCard (data) { 
    let icon = getWeatherIcon(data);

    const html = `<div class="card">

    <h2 class="card-city">${data.location.name} <span>${data.location.country}</span></h2>

    <div class="card-wather">
    <div class="card-value">${data.current.temp_c}<sup>°C</sup></div>
    <img class="card-img" src="./img/${icon}" alt="Wather">
    </div>

 <div class="card-description">${data.current.condition.text}</div>
 </div>`

    header.insertAdjacentHTML('afterend', html);
}    

function getWeatherIcon(data) {
    // Extract the condition code from the response
    const conditionCode = data.current.condition.code;
    // Return the corresponding weather icon, or a default icon if the condition code is not recognized
    return WEATHER_ICONS[conditionCode] || ICON_CLEAR;
}

async function getWeather(city) {

    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
    }
/////Слушаем форму

form.onsubmit = async function (e) {

    e.preventDefault();
    //////Берем значение из импута Убираем пробелы
    let city = input.value.trim();

    const data = await getWeather(city);



    if (data.error) {
        removCard();
        showError(data.error.message);

    } else {
        removCard();

        //const response = await fetch('./conditions.json');
        //const data = await response.json();
        //console.log(data);
        //console.log(response);

        showCard(data);

    }
}




