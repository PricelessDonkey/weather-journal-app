// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');

// Require Body-Parser to parse Json Bodies
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, listening);
 function listening(){
    console.log(`running on localhost: ${port}`);
};
  
// GET route
app.get('/all', sendData);

function sendData (request, response) {
  response.send(projectData);
};

// POST route
app.post('/addData', addData);

function addData(req, res) {

    let newData = req.body;
    let newEntry = {
        temp: newData.temp,
        date: newData.date,
        feelings: newData.feelings
    }
    const size = projectData.push(newEntry);
};