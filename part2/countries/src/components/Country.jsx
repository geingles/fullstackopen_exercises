import CountryFilter from "../Utils"
import { useState, useEffect } from "react"
import axios from 'axios'

const Country = ({country, showInfo, setSearchName, setResults, countryList}) => {
    const [icon, setIcon] = useState('')
    const [temperature, setTemperature] = useState('')
    const [windSpeed, setWindSpeed] = useState('')

    const handleShowClick = (event) => {
        setSearchName(event.target.name)
        setResults(CountryFilter(countryList, event.target.name))
    }

    if(showInfo){
        const api_key = import.meta.env.VITE_OPENWEATHER_KEY
        const languages = Object.values(country.languages)
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}&units=metric`

        useEffect(() => {
            axios
            .get(weatherUrl)
            .then(response => {
                setIcon(response.data.weather[0].icon)
                setTemperature(response.data.main.temp)
                setWindSpeed(response.data.wind.speed)
            })
            .catch(error => {
                console.log(error)
            })
        }, [])

        return (
            <div>
                <h1>{country.name.common}</h1>
                <div>Capital {country.capital}</div>
                <div>Area {country.area}</div>
                <div>Population {country.population}</div>
                <h2>Languages</h2>
                <ul>
                    {
                        languages.map(lang => <li key={lang}>{lang}</li>)
                    }
                </ul>
                <div>
                    <img src={country.flags.png} />
                </div>
                <h2>Weather in {country.capital}</h2>
                <div>Temperature {temperature} Celcius</div>
                <img src={'https://openweathermap.org/img/wn/' + icon +'@2x.png'} />
                <div>Wind {windSpeed} m/s</div>
            </div>
        ) 
    }
    return(
        <p>
            {country.name.common} <button name={country.name.common} onClick={handleShowClick}>show</button>
        </p>
    )
}

export default Country