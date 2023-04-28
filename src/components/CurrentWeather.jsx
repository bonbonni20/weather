import React from 'react'
import { Typography, Grid, Box, capitalize } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import OpacityIcon from '@mui/icons-material/Opacity';

const CurrentWeather = ({ data }) => {
    const dateFormat = (dateValue) => {
        const date = new Date(dateValue * 1000);
        const options = {
            weekday: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
        return date.toLocaleDateString("en-us", options);
    }
    return (
        <div className='flex justify-center m-8'>
            {data[1].current !== undefined &&
                <div className="border-solid m-9 w-2/5">
                    <div className='flex-1 h-34'>
                        <h1 className='font-bold'>{data[0]}</h1>
                        <h2>{dateFormat(data[1].current.dt)}</h2>
                    </div>
                    <div className='flex justify-center'>
                        <h1 className='text-2xl font-bold'>{Math.round(data[1].current.temp)}</h1>
                        <img src={`${process.env.REACT_APP_WEATHER_URL}${data[1].current.weather[0].icon}@2x.png`} /> 
                    </div> 
                    <div className='flex justify-center'>Air Conditions</div>
                    <div className='flex justify-between'>
                        <p>Feels like {Math.round(data[1].current.feels_like)}</p>
                        <p>Wind {Math.round(data[1].current.wind_speed)}</p>
                        <p>Cloud {data[1].current.clouds} %</p>
                        <p>Humidity {Math.round(data[1].current.humidity)} %</p>
                    </div>

                </div>
            }
        </div>
    )
}

export default CurrentWeather