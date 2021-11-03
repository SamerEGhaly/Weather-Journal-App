/* Global Variables */
const apiKey = "&appid=6e17373dacbbe7e9393c4a937ee7664b";
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
// Create a new date instance dynamically with JS
let date = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let generateButton = document.querySelector("#generate");

async function getWeather(){ // fetch weather data from weather api using zip code provided by user
    let zipCode = document.querySelector("#zip").value;
    if(zipCode) // make sure zip code input box is not empty
    {
        await fetch(baseURL+zipCode+apiKey);
    }
}

generateButton.addEventListener("click", getWeather);