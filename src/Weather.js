import React, { useState } from 'react'



const apiKEY = process.env.REACT_APP_WEATHERING_API_KEY


 


function Weather() {



    const [weather, setWeather] = useState({
        temp: null,
        name: null,
        icon: null,
        main: null,
        wind: null,
        humidity: null,
        maxTemp: null,
        minTemp: null

    })
    const [city, setCity] = useState(90210)
   

    const [isValidZip, setIsValidZip] = useState(true)
    
    
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKEY}&units=imperial`  //search by name

    const url2 = `https://api.openweathermap.org/data/2.5/weather?zip=${city},us&appid=${apiKEY}&units=imperial` // search by zip
     

      const iconLink = `http://openweathermap.org/img/wn/${weather.icon}@4x.png`

      function handleSearch(event) {
            let zipCode = event.target.value
            let isValid = validateZip(zipCode)
            setCity(zipCode)

            if (isValid || zipCode === '' || isValid.length === 5) {
                setIsValidZip(true)
            } else {
                setIsValidZip(false)
            }
            
      }

      function validateZip(zipCode) {
          let regex = /[0-9]{5}/
          return regex.test(zipCode)
      }

      function getWeather() {
        fetch(url2)
        .then(res => res.json())
        .then(
            (result) => {
                setWeather({
                    temp: result.main.temp,
                    name: result.name,
                    icon: result.weather[0].icon,
                    main: result.weather[0].main,
                    wind: result.wind,
                    humidity: result.main.humidity,
                    maxTemp: result.main.temp_max,
                    minTemp: result.main.temp_min
                })
               
            }
        )
        .catch(error => console.log(error))
      }

      
            const weatherStyle = {
                backgroundColor: 
                    weather.temp > 90 ? 'rgba(200,25,18, .5)' : 
                    weather.temp > 80 ? 'rgba(255,95,64,.5)' : 
                    weather.temp > 70 ? 'rgba(255,163,114, .5)' : 
                    weather.temp > 60 ? 'rgba(247,197,168, .5)' :
                    weather.temp > 50 ? 'rgba(111,185,143, .5)' :
                    weather.temp > 40 ? 'rgba(53,176,171, .5)' :
                    weather.temp > 32 ? 'rgba(64,112,136,.5)' :
                    weather.temp > 0 ? 'rgba(4,47,75, .5)' :
                    weather.temp = 0 ? 'rgba(0,8,57, .5)' :
                    weather.temp < 0 ? 'rgba(93,91,106, .5)' :
                    'rgba(50,130,184, .75)'
            }
      
     

    return (
        <div className="weather" style={weatherStyle}>
               <div className="input-box">
               
                   <input 
                       className="material-input"
                       type="text"
                       placeholder="90210"
                       onChange={handleSearch}
                       maxLength='5'
                       onKeyPress={(e) => e.key === 'Enter' ? getWeather() : null}
                   />
                   <button 
                       onClick={getWeather}
                       className="material-icons search"
                       >{isValidZip ? "search" : ""}
                   </button>
                   
               </div>
               <p className="error">{isValidZip ? "" : "Invalid Zip Code"}</p>
               <div className="weather-box" >
                        {weather.name === null ? (
                            <p >Enter Zip Code for weather</p>
                        ) : ""}
                   
                   {weather.name !== null ? (
                       <div>
                            <h2 className="city-name">{weather.name}</h2>
               <img src={iconLink} alt="weather icon" className="icon"/>
               <h2 className="weather-main">{weather.main}</h2>
               <h1>{Math.round(weather.temp)}&#176;  F</h1>
               <h4>Hi {Math.round(weather.maxTemp)}&#176;  F</h4>
               <h4>Lo {Math.round(weather.minTemp)}&#176;  F</h4>
               <h4>Humidity {weather.humidity} %</h4>
               <h4>Wind {Math.round(weather.wind.speed)}MPH</h4>
                       </div>
                      
                   ) : ''}
                     
               </div>            
        </div>
    )
}



export default Weather