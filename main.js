// Ajax Get
function get(url) {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.open('GET', url);
        req.onload = () => req.status === 200 ? resolve(req.response) : reject(Error(req.statusText));
        req.onerror = (e) => reject(Error(`Network Error: ${e}`));
        req.send();
    });
}

// This function gives the relative weather now.
function weatherHistory() { 
    const api = 'http://api.openweathermap.org/data/2.5/weather?';
    const city = document.getElementById('city').value;
    const input = 'zip=' + city + ',us';
    const api_key = '&APPID=3a5bf1eb2a22106bac2d6d95c02695fb';
    const units = '&units=imperial';
    const url = api + input + api_key + units;
    console.log(url);   
    get(url)
        .then((data) => {
            const x = JSON.parse(data);
            const city = x.name;
            const max = x.main.temp_max;
            const min = x.main.temp_min;
            const humidity = x.main.humidity;
            const div = document.getElementById('blank');
            const api_data = "<div><li> City of " + city + "</li></div><br/>"
            + "<li> Min Temp: " + min + "</li>" + "<li> Max Temp: " + max + "</li>" + "<li>Humidity: " + humidity + "</li>"
            div.innerHTML = api_data;
        })
        .catch((err) => {
            console.log('Oops something went wrong, please try again');
        });
}

