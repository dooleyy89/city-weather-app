let unit = "imperial";
const imp = document.getElementById('imperial');
const met = document.getElementById('metric');
let cityEntered = "ypsilanti";

imp.addEventListener('click', function(){
    imp.style.backgroundColor = "rgb(65, 89, 131)";
    met.style.backgroundColor = "#001235";
    unit = "imperial";
    console.log(unit);
    cityData(cityEntered);
    time();
});

met.addEventListener('click', function(){
    met.style.backgroundColor = "rgb(65, 89, 131)";
    imp.style.backgroundColor = "#001235";
    unit = "metric";
    console.log(unit);
    cityData(cityEntered);
    time();
});

document.getElementById('finder').addEventListener('click', requestWeather);
document.getElementById('cityinput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        requestWeather();
    }
});

function requestWeather() {
    const city = document.getElementById('cityinput').value.trim();
    if (city) {
        // log in console to see if it works lol
        console.log('City entered:', city); 
        //function to grab weather data
        cityData(city);
        time();
    }
}

async function cityData(city) {
    
    const key = "----------------------------------";
    const base = "https://api.openweathermap.org/data/2.5/weather";
    const invalid = document.querySelector('.invalid');
    const img = document.getElementById('imgdesc');
    try {
        forecastURL = `api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=7&appid=${key}&units=${unit}`;
        url = `${base}?q=${city}&appid=${key}&units=${unit}`;
        const response = await fetch(url);
        if (response.status === 200) {

            cityEntered = city;
            invalid.style.display = 'none';
            const data = await response.json();
            const weatherID = data.weather[0].id;
            const w = data.weather[0].icon;
            let FC = unit === "imperial" ? "F" : "C";
            let wUnit = unit === "imperial" ? "mph" : "m/s";
            document.getElementById('temp').textContent = `${Math.floor(data.main.temp)}°${FC}`;
            document.getElementById('cityname').textContent = `${data.name}`;
            document.getElementById('feels').textContent = `Feels like: ${Math.floor(data.main.feels_like)}°${FC}`;
            document.getElementById('wdesc').textContent = `${data.weather[0].description},`;
            document.getElementById('lowhi').textContent = `H: ${Math.floor(data.main.temp_max)}°${FC} |  L: ${Math.floor(data.main.temp_min)}°${FC}`;
            document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
            document.getElementById('wspeed').textContent = `Speed          ${Math.floor(data.wind.speed)} ${wUnit}`;
            document.getElementById('wgust').textContent = `Gust             ${Math.floor(data.wind.gust)} ${wUnit}`;
            document.getElementById('wdir').textContent = `Direction      ${data.wind.deg}°`;
            document.getElementById('dirimg').style.transform = `rotate(${data.wind.deg}deg)`;
            document.getElementById('visible').textContent = `Visibility: ${(data.visibility/1000).toFixed(1)}km`;
            //below is the images from the site. if files don't work, use this.
            //img.src = `https://openweathermap.org/img/wn/${w}@2x.png`

            //pictures from images folder. if doesn't work, uncomment link above.
            setImage(img, weatherID);
        } else {
            invalid.style.display = 'block';
        }
    } catch(err) {
        console.error('Error fetching data: ', err);
        invalid.style.display = 'block';
    }
}

function setImage(img, id) {
    //thunder
    if (id >= 200 && id <= 202 || id >= 230 && id <= 232) img.src = "images/thunderrain.png";
    else if (id >= 210 && id <= 221) img.src = "images/thunder.png";
    //rain
    if (id >= 300 && id <= 321) img.src = "images/drizzle.png";
    if (id >= 500 && id <= 531) img.src = "images/heavyrain.png";
    //snow
    if (id >= 600 && id <= 622) img.src = "images/snow.png";
    //atmosphere
    if (id >= 701 && id <= 781) img.src = "images/haze.png";
    //clear
    if (id === 800) img.src = "images/sunny.png";
    //cloudy
    if (id >= 801 && id <= 802) img.src = "images/sunnycloud.png";
    else if (id === 803 || id === 804) img.src = "images/cloudy.png";
}
function findMonth(month) {
    if (month === 1) return "Jan";
    else if (month === 2) return "Feb";
    else if (month === 3) return "Mar";
    else if (month === 4) return "Apr";
    else if (month === 5) return "May";
    else if (month === 6) return "Jun";
    else if (month === 7) return "Jul";
    else if (month === 8) return "Aug";
    else if (month === 9) return "Sep";
    else if (month === 10) return "Oct";
    else if (month === 11) return "Nov";
    else if (month === 12) return "Dec";
}

function time() {
    const date = new Date();
    
    //date
    let month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    //time
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const AMPM = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const dateformat = `${findMonth(month)} ${day}, ${year}`;
    const timeformat = `Updated ${hours}:${minutes < 10 ? '0' + minutes : minutes}${AMPM}`;
    document.getElementById('timez').textContent = `${timeformat} | ${dateformat}`;
}

cityData(cityEntered);
time();
