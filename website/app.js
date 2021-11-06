//const { json } = require("stream/consumers");

/* Global Variables */
const apiKey = ",us&appid=6e17373dacbbe7e9393c4a937ee7664b&units=metric";
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
// Create a new date instance dynamically with JS
let date = new Date();
let generateButton = document.querySelector("#generate");

async function getWeather(){ // fetch weather data from weather api using zip code provided by user
    let zipCode = document.querySelector("#zip").value; // get zip code from the input box
    if(zipCode) // make sure zip code input box is not empty
    {
        const response = await fetch(baseURL+zipCode+apiKey)
        try{
            let res = await response.json();
            let tempF = res.main.temp + " " + String.fromCharCode(176) + "C"; // extract temperature from fetched weather data
            let newDate = (date.getMonth() + 1) + "." + date.getDate() + "." + date.getFullYear(); // get current date
            let userInput = document.querySelector("#feelings").value; // get user's input from the text box
            let data = {temperature: tempF, date: newDate, "user response": userInput}; // create the java object to hold our data
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

async function postData(url, data){ // post received data to server
    await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}

async function updateUI(){ // get data from server and update html document
    const response = await fetch("/get");
    
    try{
        let res = await response.json()
        document.querySelector("#date").innerHTML = res["date"];
        document.querySelector("#temp").innerHTML = res["temperature"];
        document.querySelector("#content").innerHTML = res["user response"];
    }
    catch(error){
        console.log("Error", error);
    }
}

generateButton.addEventListener("click", function(){ // wait for button click then chain our functions to each other
    getWeather()
    .then(data => {
        postData("/add", data)
        .then(updateUI())
    });
});