/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&units=imperial&appid=084900f4e5ae69045da58d41a51d4e39';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// store zip input in variable for quick access
const zipInputElement = document.getElementById('zip')

// listen for click on generate button
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  clearErrorState();
  e.preventDefault();

  // get ZIP and user response from HTML
  const zip = zipInputElement.value;
  const userResponse = document.getElementById('feelings').value;
  const testURL = baseURL + zip + apiKey;

  getWeather(testURL)
    .then(function (data) {
      postData('/addData', { temp: data.main.temp, date: newDate, feelings: userResponse })
        .then(updateUI())
    }, function (error) {
        setErrorState();
    })
};

const getWeather = async (testURL) => {
  
  let res = await fetch(testURL);
  if (res.status != 200) throw new Error('bad request'); 
  try {   
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
    }
}

// post data
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    const index = allData.length-1;
   
    document.getElementById('date').innerHTML = allData[index].date;
    document.getElementById('temp').innerHTML = allData[index].temp + ' degrees fahrenheit';
    document.getElementById('content').innerHTML = allData[index].feelings;

    } catch (error) {
      console.log("error", error);
    }
}

function setErrorState() {
  zipInputElement.classList.add('error');
  zipInputElement.value = '';
  zipInputElement.placeholder = 'invalid zip - try again';
}

function clearErrorState() {
  zipInputElement.placeholder = 'enter zip code here';
}
