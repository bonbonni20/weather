import './App.css';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import { Autocomplete, Stack, Box, CardContent, CardHeader, CardMedia, TextField, Typography } from '@mui/material';
import axios from 'axios'

function App() {

  let [search, setSearch] = useState("");
  let[citiesInfo, setCitiesInfo] = useState([]);
  //current weather
  let [data, setData] = useState({});
  let apiKey = '2848195f80ab69cb3bd3003ab44f492d'
  let weatherURL = `http://openweathermap.org/img/wn/`
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const fetchCitieslist = () => {
    try{
      const cities_URL =`http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`
      fetch(cities_URL)
      .then(response => response.json())
      .then(cityList => {setCitiesInfo(cityList)
      console.log(cityList)})
    }
    catch(error) { console.log(error);}  
  }
  // const checkWeather = async() => {
  //   const url = `https://api.openweathermap.org/data/2.5/weather?&q=${search}&units=metric&appid=${apiKey}`
  //   await axios.get(url)
  //     .then(response => response.data)
  //     .then(result => setData(result))
  //     .catch(error => console.log(error))
  // }

  const handleClick = (value) => {
    useEffect = () => {
      fetchCitieslist(value)
      // checkWeather(value)
       // fetchForecastData()
       
       console.log('meh')
       console.log(citiesInfo)
    }
  }

  // const fetchForecastData =() =>{
  //   const foreCastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=2848195f80ab69cb3bd3003ab44f492d`
  //   axios.get(foreCastUrl)
  //   .then(response => {
  //   })
  // }
  return (
    <div >
      <h1>Open Weather</h1>
      {/* search bar */}
      <div className='myInput '>
        <input
          name='search'
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)} />
        <button onClick={handleClick}>Search</button>
        <div className="dropdown">
        {citiesInfo.map((item) => (
        <div className='dropdown-content' onClick={handleClick(item.name)}>
         {item.name} {item.state}, {item.country}
        </div>
        ))}
        </div>
        {/* <div>
          <Stack spacing={2} sx={{width: 300}}>
          <Autocomplete 
          id='search_box'
          sx={{width: 300}}
          options={citiesInfo}
          onClick={handleClick}
          renderOption={(option) => (
            <Box component='li'>              
            {option.name}, {option.state}, {option.country}
            </Box>
          )}
          renderInput={(params) => 
            <TextField 
            {...params} 
            label="Search city..."
            InputProps={{
              ...params.InputProps,
              type:'search',
            }}/>
          }
          />
          </Stack>
      // </div> */}
      <div className='today_section'>
      <Card
          variant='outlined'
          sx={{ width: 500 }}>
          <CardHeader
            title={data.name} />
          {typeof(data.main) !== "undefined" ? (
            <CardContent className='today_section'>
              <img className='weather_icon' src={`${weatherURL}${data.weather[0].icon}@2x.png`} />
              <div className='today_section_info'><Typography variant='h6'>{data.main.temp}°</Typography>
                <Typography>{data.weather[0].description}</Typography>
                <Typography>Feels like <b>{data.main.feels_like}°</b></Typography></div>

            </CardContent>) : null} 

         </Card>
      </div>

      {/* <div className='week_section'>
        <Card
          variant='outlined'
          sx={{ width: 500 }}>
          <CardContent className='week_section_card' sx={{ gap: 5 }}>
            <Typography variant='h6'>Today</Typography>
            <Typography>Mostly Cloudy</Typography>
            <Typography variant='h6'>5°</Typography>
          </CardContent>
        </Card>
      </div> */}
    </div> 
  </div>
  )
}

export default App; 
