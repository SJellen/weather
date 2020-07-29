import React, {useState, useEffect} from 'react'


const apiKEY = process.env.REACT_APP_WEATHERING_API_KEY







function Weather() {
    const [weather, setWeather] = useState([])
    const [city, setCity] = useState(90210)
    const [temp, setTemp] = useState("") 
    const [name, setName] = useState("")
    const [icon, setIcon] = useState("")
    const [description, setDescription] = useState("")
    const [main, setMain] = useState("")   
    const [country, setCountry]  = useState("")
    const [wind, setWind] = useState("")
    const [humidity, setHumidity] = useState("")
    const [maxTemp, setMaxtemp] = useState('')
    const [minTemp, setMintemp] = useState('')

    const [isValidZip, setIsValidZip] = useState(true)
    
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKEY}&units=imperial`  //search by name

    const url2 = `https://api.openweathermap.org/data/2.5/weather?zip=${city},us&appid=${apiKEY}&units=imperial` // search by zip
    



    useEffect(() => {
        
        fetch(url2)
        .then(res => res.json())
        .then(
            (result) => {
                setName(result.name)
                setTemp(result.main.temp)
                setIcon(result.weather[0].icon)
                setDescription(result.weather[0].description)
                setMain(result.weather[0].main)
                setCountry(result.sys.country)
                setWind(result.wind)
                setHumidity(result.main.humidity)
                setMaxtemp(result.main.temp_max)
                setMintemp(result.main.temp_min)
            }
        )
        .catch(error => console.log(error))
       }, [])


      

      

      const iconLink = `http://openweathermap.org/img/wn/${icon}@4x.png`

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
                
                setName(result.name)
                setTemp(result.main.temp)
                setIcon(result.weather[0].icon)
                setDescription(result.weather[0].description)
                setMain(result.weather[0].main)
                setCountry(result.sys.country)
                setWind(result.wind)
                setHumidity(result.main.humidity)
                setMaxtemp(result.main.temp_max)
                setMintemp(result.main.temp_min)
            }
        )
        .catch(error => console.log(error))
      }

      
     

    return (
        <div className="weather">
               <div className="input-box">
               <p className="error">{isValidZip ? "" : "Invalid Zip Code"}</p>
                   <input 
                       type="text"
                       placeholder="Enter Zip Code"
                       onChange={handleSearch}
                       maxLength='5'
                       
                   />
                   <button onClick={getWeather}>Weather</button>
                   
               </div>
               <div className="weather-box">
                   <h2>{name}</h2>
               <img src={iconLink} alt="weather icon"/>
               <h1>{Math.round(temp)}</h1>
               <h3>{Math.round(maxTemp)}</h3> <h3>{Math.round(minTemp)}</h3>
               
               <p>{main}<br></br>{description}</p>
                
                <h3>Humidity {humidity} %</h3>
              
               <p>Wind {Math.round(wind.speed)}MPH</p>
               </div>
               
              
               


               
             
        </div>
       
    )

}



export default Weather