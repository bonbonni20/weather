import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { Card, CardContent, CardHeader, Typography, capitalize } from '@mui/material';
import { AsyncPaginate } from 'react-select-async-paginate';


function App() {
  let [searchTerm, setSearchTerm] = useState();
  let [data, setData] = useState({});
  let apiKey = '2848195f80ab69cb3bd3003ab44f492d'
  let weatherURL = `http://openweathermap.org/img/wn/`

  const fetchCitieslist = async (value) => {
    const cities_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${apiKey}`
    return axios.get(cities_URL)
      .then(response => response.data)
      .then(cityList => {
        return {
          options: cityList.map((city) => {
            return {
              value: `${city.lat} ${city.lon}`,
              label: (!city.state) ? `${city.name}, ${city.country}` : `${city.name}, ${city.state}, ${city.country}`
            }
          })
        }
      })
      .catch(error => console.log('error', error));
  }

  const CheckWeather = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`
    axios.get(url)
      .then(response => response.data)
      .then(result => {
        setData(result)
        console.log("result", result)
      })
  }

  const dateFormat = (dateValue) => {
    return new Date(dateValue * 1000).toLocaleDateString("en-us", { weekday: "long" });
  }

  const handleClick = (value) => {
    setSearchTerm(value.label.substring(0, value.label.indexOf(",")))
    console.log(searchTerm, "name")

    console.log("input.value", value)
    const [lat, lon] = value.value.split(" ")
    CheckWeather(lat, lon)

  }

  return (
    <div className='main_content'>
      <h1>Open Weather</h1>
      {/* search bar */}
      <div className='search_section'>
        <AsyncPaginate
          className='search_bar'
          placeholder="Search for a city"
          onChange={handleClick}
          loadOptions={fetchCitieslist} />
      </div>
      <div className='today_section'>
        {data.current !== undefined &&
          <Card
            variant='outlined'
            sx={{ width: 490 }} >
            <CardHeader
              title={searchTerm} />
            <CardContent className='today_section_info'>              
            <div className='info'>
              <img alt='weather-icon' src={`${weatherURL}${data.current.weather[0].icon}@2x.png`} />
              <Typography classname="temp_info" variant='h3'>
                <b>{Math.round(data.current.temp)}°</b>
              </Typography>
              <Typography variant='h5'>
                <li>{capitalize(data.current.weather[0].description)}</li>
                <li>Feels like <b>{Math.round(data.current.feels_like)}°</b></li>
              </Typography>
            </div>
            </CardContent>
          </Card>
        }
      </div>
      <div className='week_section'>
        {data.daily !== undefined &&
          <Card
            variant='outlined'
            sx={{ width: 500 }}>
            {data.daily.map(day =>
              <CardContent className='week_section_card'>
                <div className='info'>
                  <Typography variant='h6'>
                    {dateFormat(day.dt)}
                  </Typography>
                  <img alt='weather-icon' src={`${weatherURL}${data.current.weather[0].icon}@2x.png`} />
                  <Typography>{day.weather[0].main}</Typography>
                  <Typography variant='h6'>{Math.round(day.temp.min)}°/{Math.round(day.temp.max)}°</Typography>
                </div>
              </CardContent>)}
          </Card>
        }
      </div>
    </div>
  )
}

export default App; 
