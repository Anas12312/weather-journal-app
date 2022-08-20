/* Global Variables */
const apiKey = '&appid=5795813d117afc7fc82efaf980fe3967&units=imperial';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const temp = document.querySelector('#temp');
const date = document.querySelector('#date');
const content = document.querySelector('#content');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// The Main Function that run when the generate button is clicked
function postData(url = '') {
    getData(url).then((data) => {
        const obj = {
            temperature: data,
            date: newDate,
            userResponse: document.querySelector('#feelings').value
        };
        post('/post', obj);
    }).then(() => {
        updateUI('/all');
    });
}

// The Button "GENERATE" Event
document.querySelector('#generate').addEventListener('click', generate);
function generate() {
    const zipCode = document.querySelector('#zip').value;
    postData(baseUrl+zipCode+apiKey);
}

// The GET Request
const getData = async(url = '') => {
    const res = await fetch(url);
    try{
        const data = await res.json();
        console.log(data);
        return data.main.temp;
    }catch(error) {
        console.log(`error happend:\n${error}`);
    }
}

// The Post Request
const post = async ( url = '', data = {})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),      
    });
    console.log(response.json())
    try{
        const newData = await response.json();
        return newData
    }catch(error) {
        console.log("error", error);
    }
}

// The GET data from server + The Update UI
const updateUI = async (url = '') => {
    const response = await fetch(url);
    try{
        const data = response.json();
        await data.then(value => {
            temp.innerHTML = Math.round(value.temperature)+ ' degrees';
            content.innerHTML = value.userResponse;
            date.innerHTML = value.date;
        }).catch(err => {
            console.log(err);
        });
        
    }catch (error){
        console.log("Error: " , error);
    }
}
