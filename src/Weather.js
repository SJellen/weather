import React, {useState} from 'react'



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
    



    // useEffect(() => {
        
    //     fetch(url2)
    //     .then(res => res.json())
    //     .then(
    //         (result) => {
    //             setWeather({
    //                 temp: result.main.temp,
    //                 name: result.name,
    //                 icon: result.weather[0].icon,
    //                 description: result.weather[0].description,
    //                 main: result.weather[0].main,
    //                 wind: result.wind,
    //                 humidity: result.main.humidity,
    //                 maxTemp: result.main.temp_max,
    //                 minTemp: result.main.temp_min
    //             })

    //         }
    //     )
    //     .catch(error => console.log(error))
    //    }, [])


      

      

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

      

      
     

    return (
        <div className="weather">
               <div className="input-box">
               
                   <input 
                       className="material-input"
                       type="text"
                       placeholder="Zip Code"
                       onChange={handleSearch}
                       maxLength='5'
                       onKeyPress={(e) => e.key === 'Enter' ? getWeather() : null}
                   />
                   <button 
                   onClick={getWeather}
                   
                   className="material-icons search"
                   >{isValidZip ? "search" : ""}</button>
                   
               </div>
               <p className="error">{isValidZip ? "" : "Invalid Zip Code"}</p>
               <div className="weather-box" >
                        {weather.name === null ? (
                            <p >No Weather Info</p>
                        ) : ""}
                   
                   {weather.name !== null ? (
                       <div>
                            <h2>{weather.name}</h2>
               <img src={iconLink} alt="weather icon"/>
               <p>{weather.main}</p>

                
               <h1>{Math.round(weather.temp)}&#176;  F</h1>
               <h3>Hi {Math.round(weather.maxTemp)}&#176;  F</h3>
               <h3>Lo {Math.round(weather.minTemp)}&#176;  F</h3>
               
               
                
                <h3>Humidity {weather.humidity} %</h3>
              
               <p>Wind {Math.round(weather.wind.speed)}MPH</p>
                       </div>
                      
                   ) : ''}
                   
                   
                   
               </div>
               
              
               


               
             
        </div>
       
    )

}



export default Weather