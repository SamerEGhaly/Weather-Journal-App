// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { exit } = require("process");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3030;
const server = app.listen(port, function(){
    console.log(`Server Running on local host: ${port}`);
});

app.get("/get", function(req, res){
    console.log("GET message");
    console.log(projectData);
    res.send(projectData);
});

app.post("/add", function(req, res){
    console.log("POST message");
    const data = req.body;
    projectData["temperature"] = data["temperature"];
    projectData["date"] = data["date"];
    projectData["user response"] = data["user response"];
    console.log(projectData);
});