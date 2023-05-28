const apiKey = '192e78d561eb519b938c8301a6e04bd5';
// const city = 'london';
const myInput = document.querySelector ("#myInput")
const searchButton = document.querySelector ("#search-button")
const oneDay = document.querySelector ("#one-day")

function findCity(e){
    e.preventDefault();
    let city = myInput.value;
    latLon(city)
}

function latLon(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Handle the API response data
        // console.log(data);



        var lat = data.coord.lat;
        var lon = data.coord.lon;

        forecast(lat, lon, city)
    })
    .catch(error => {
        // Handle any errors that occurred during the API call
        console.error(error);


    });
}


function forecast(lat, lon, city){
   const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    // const apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=${apiKey}`
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Handle the API response data
        console.log(data);
        // let temp = data.list[0].main.temp;
        let tempEl = document.createElement('p');
        tempEl.textContent = `Temp: ${data.list[0].main.temp}F`
        oneDay.append(tempEl)

    })
    .catch(error => {
        // Handle any errors that occurred during the API call
        console.error(error);
    });
}

searchButton.addEventListener("click", findCity)

    function populateWeatherIconAndTemperature(lat, lon, city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&q=${city}&appid=${apiKey}`;
       
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            const weatherCode = data.list.weather.icon[0];
            const temperature = Math.round(data.list.main.temp - 273.15); // Convert temperature from Kelvin to Celsius
            const weatherIconSrc = `https://openweathermap.org/img/wn/${weatherCode}.png`;
            const weatherIcon = $('<img>').attr('src', weatherIconSrc);
            $('#weather-icon').empty().append(weatherIcon);
  
            $('#temperature').text(`Temperature: ${temperature}°C`);
          });
      }
      searchButton.addEventListener("click", populateWeatherIconAndTemperature)

      let locationIcon = document.querySelector('.weather-icon');
      const {icon} = data.weather[0];
      locationIcon.innerHTML = `<img src="icons/${icon}.png">`;