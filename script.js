//ELEMENTS
const notificationElement = document.querySelector('.notification');
const iconElement = document.querySelector('.weather-icon');
const temperatureElement = document.querySelector('.temperature-value p');
const descriptionElement = document.querySelector('.temperature-description p');
const locationElement = document.querySelector('.location p');

// DATA of app
const weather = {}

    weather.temperature = {
        units: 'celsius'
    
    }


// app const and vars
const KELVIN = 273;
// api key
const key = "b508399c61911f4ed43ed1db842fe353";

// // check if browser supports geolocation

if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);

}   

else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>please turn on your location.</p>"

}

// //set user's position 
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
   
}

// show errors if issue with location
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}
 //Get weather from API
 function getWeather(latitude, longitude){
        let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
        
        fetch(api)
            .then(function (response) {
                let data = response.json();
                return data;
            })
            .then( function(data){
                weather.temperature.value = Math.floor(data.main.temp - KELVIN);
                weather.description = data.weather[0].description;
                weather.iconId = data.weather[0].icon;
                weather.city = data.name;
                weather.country = data.sys.country;
            }
            )
            .then( function (){
                displayWeather();

            });
    }    

 //DISPLAY WEATHER TO UI
function displayWeather() {

iconElement.innerHTML = `<img src="images/icons/${weather.iconId}.png"/>`; 
temperatureElement.innerHTML = `${weather.temperature.value} ° <span>C</span>`;
descriptionElement.innerHTML = weather.description;
locationElement.innerHTML = `${weather.city}, ${weather.country}`;

}

//C TO F Conversion
function celsiusToFahrenheit( temperature) {
        return (temperature *9/5 ) + 32;
     }

//when User clicks
temperatureElement.addEventListener("click", function(){
        if(weather.temperature.value === undefined) return;
        if(weather.temperature.unit === "celsius"){
          let fahrenheit =  celsiusToFahrenheit(weather.temperature.value );
          fahrenheit = Math.floor(fahrenheit);
          temperatureElement.innerHTML = `${fahrenheit}° <span>F</span>`;
          weather.temperature.unit = "fahrenheit";
        
    }
    else {
        temperatureElement.innerHTML = `${weather.temperature.value} °<span>C</span>`;  
        weather.temperature.unit = "celsius";

    }
});




// weather.temperature.value = 300 - 273
// 


// 



// }
// );

// // getCurrentPosition(setPosition, error);
// // setPosition( position)
// //     position.coords.latitude 
// //     position.coords.longitude
// // error(error)    
// //     error.message

    
    





// 
//     .then( function(data){
//         weather.temperature.value =  Math.floor (  data.main.temp - KELVIN);
//         weather.description = data.weather[0].description;
//         weather.iconId = data.weather[0].icon;
//         weather.city = data.name;
//         weather.country = data.sys.country


//     })
//     .then( function(){
//         displayWeather();
//     })

//




// app constant and var