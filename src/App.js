import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Typography, capitalize } from '@mui/material';
import { AsyncPaginate } from 'react-select-async-paginate';


function App() {
  let [searchTerm, setSearchTerm] = useState("");
  let [cityInfo, setCityInfo] = useState([]);
  let [data, setData] = useState({});
  let apiKey = '2848195f80ab69cb3bd3003ab44f492d'
  let weatherURL = `http://openweathermap.org/img/wn/`

  const fetchCitieslist = async(value) => {
    console.log("dgdfgffd")
    if(value !== ""){
    const cities_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${apiKey}`
    return await fetch(cities_URL)
      .then((response) => response.json())
      .then((cityList) => {
        console.log(cityList)
        return {
          options: cityList.map((city) => {
            return {
              label: (!city.state) ? `${city.name}, ${city.country}`:`${city.name}, ${city.state}, ${city.country}`,
              value: `${city.lat} ${city.lon}`,
            }
          })
        }    
      })
      .catch(error => console.log('error', error));
    }
  }

  useEffect(() => {
    if(searchTerm.length > 0)
    {
    fetchCitieslist(searchTerm)}
  },[fetchCitieslist, searchTerm])
  // const fetchCitieslist = async(value) => {
  //   const cities_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${apiKey}`
  //   await fetch(cities_URL)
  //     .then((response) => response.json())
  //     .then((cityList) => {
  //       setCityInfo(cityList)
      
  //       console.log(cityList)
  //     })
  //     .catch(error => console.log('error', error));
  // }
  
  console.log(cityInfo)

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     fetchCitieslist()
  //   }, 500)
  //   return () => clearTimeout(timer)
  // }, [searchTerm])

  const CheckWeather = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`
    await axios.get(url)
      .then(response => response.data)
      .then(result => {
        setData(result)
       // console.log("result", result)
      })
      .catch(error => console.log('error', error));
  }

  const dateFormat = (dateValue) => {
    return new Date(dateValue * 1000).toLocaleDateString("en-us", { weekday: "long" });
  }

  const handleClick = (value) => {
    setSearchTerm(value.label.substring(0, value.label.indexOf(",")))
    console.log(searchTerm, "search-name")

    if(value !== undefined){
      console.log("input.value", value)
      const [lat, lon] = value.value.split(" ")
      CheckWeather(lat, lon)
    }

  }
console.log(fetchCitieslist)
  return (
    <div className='main_content'>
      <h1>Open Weather</h1>
      {/* search bar */}
      <div className='search_section'>
        <AsyncPaginate
          className='search_bar'
          placeholder="Search for a city"          
          debounceTimeout={600}
          value={searchTerm}
          // loadOptions={{options: cityInfo.map((city) => 
          //   [
          //     {label: city.name, 
          //     value: city.lat}
          //   ])}}          
         loadOptions={fetchCitieslist }
          onChange={handleClick} />
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
              <Typography className="temp_info" variant='h3'>
                <b>{Math.round(data.current.temp)}°C</b>
              </Typography>
              <Typography variant='h5'>
                <li key={data.current.weather[0].id}>{capitalize(data.current.weather[0].description)}</li>
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
            {data.daily.map((day, index) =>
              <CardContent className='week_section_card' key={index}>
                <div className='info'>
                  <Typography variant='h6'>
                    {dateFormat(day.dt)}
                  </Typography>
                  <img alt='weather-icon' src={`${weatherURL}${data.current.weather[0].icon}@2x.png`} />
                  <Typography>{day.weather[0].main}</Typography>
                  <Typography variant='h6'>{Math.round(day.temp.min)}°C/{Math.round(day.temp.max)}°C</Typography>
                </div>
              </CardContent>)}
          </Card>
        }
      </div>
    </div>
  )
}

export default App; 
