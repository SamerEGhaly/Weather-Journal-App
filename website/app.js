//const { json } = require("stream/consumers");

/* Global Variables */
const apiKey = ",us&appid=6e17373dacbbe7e9393c4a937ee7664b";
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
// Create a new date instance dynamically with JS
let date = new Date();
let generateButton = document.querySelector("#generate");

async function getWeather(){ // fetch weather data from weather api using zip code provided by user
    let zipCode = document.querySelector("#zip").value;
    if(zipCode) // make sure zip code input box is not empty
    {
        const response = await fetch(baseURL+zipCode+apiKey)
        try{
            let res = await response.json();
            let tempF = res.main.temp;
            let newDate = date.getDate()+'.'+ date.getMonth()+'.'+ date.getFullYear();
            let userInput = document.querySelector("#feelings").value;
            let data = {temperature: tempF, date: newDate, "user response": userInput};
            return data;
        }
        catch(error){
            console.log("Error ", error);
        }
    }
    else {
        console.log("Please enter a zip code.");
    }
}

async function postData(url, data)
{
    await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    try{
        return data;
    }
    catch(error){
        console.log("Error", error);
    }
}

async function updateUI(){
    const response = await fetch("/get");
    
    try{
        let res = await response.json()
        document.querySelector("#date").textContent = res["date"];
        document.querySelector("#temp").textContent = res["temperature"];
        document.querySelector("#content").textContent = res["user response"];
    }
    catch(error){
        console.log("Error", error);
    }
}

generateButton.addEventListener("click", function(){
    getWeather()
    .then(data => {
        postData("/add", data)
        .then(updateUI())
    });
});