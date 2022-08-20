// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
const bodyParser = require('body-parser');
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
const server = app.listen(port, () => {
    console.log(`Server Running on Port: ${port}`);
})

app.get('/all' , getAllData);
app.post('/post', postData);
function postData(req, res){
    const data = req.body;
    projectData = {
        temperature: data.temperature,
        date: data.date,
        userResponse: data.userResponse
    };
    console.log(projectData);
}
function getAllData(req, res){
    res.send(projectData);
}