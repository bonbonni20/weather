import React from 'react'
import { Typography, Grid, Box } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import OpacityIcon from '@mui/icons-material/Opacity';

const Forecast = ({ data }) => {
  
  const dateFormat = (dateValue) => {
    return new Date(dateValue * 1000).toLocaleDateString("en-us", { weekday: "long" });
  }

  return (
    <div>
      {data.daily !== undefined &&
        <div className='flex justify-center m-4'>
          {data.daily.map((day, index) => 
          <div key={index}>
          <h3>{dateFormat(day.dt)}</h3>
          <img src={`${process.env.REACT_APP_WEATHER_URL}${day.weather[0].icon}@2x.png`} /> 
          <h3>{day.weather[0].main}</h3>
          <ul>
            <li>Temp {Math.round(day.temp.min)}°/{Math.round(day.temp.max)}°</li>
            <li>D/N {Math.round(day.feels_like.day)}°/{Math.round(day.feels_like.night)}°</li>
          </ul>
          <ul>
            <li>Wind {Math.round(day.wind_speed)} km/h</li>
            <li>Humidity {Math.round(day.humidity)}%</li>
          </ul>
          </div>)}
        </div>
      }
    </div >
  )
}

export default Forecast