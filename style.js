
const apiKey = 'c9d724d9060e483eaf9122257241304';

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




function showCard (name, country, temp, condition, ) { 
    const html = `<div class="card">

    <h2 class="card-city">${name} <span>${country}</span></h2>

    <div class="card-wather">
    <div class="card-value">${temp}<sup>°C</sup></div>
    <img class="card-img" src="./img/clear.png" alt="Wather">
    </div>

 <div class="card-description">${condition}</div>
 </div>`

    header.insertAdjacentHTML('afterend', html);
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

    showCard(
        data.location.name,
        data.location.country,
        data.current.temp_c,
        data.current.condition.text,
        
        
    );

    }
    
    

}