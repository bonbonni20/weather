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
        <div>
            {data[1].current !== undefined &&
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        p: 1,
                        m: 1,
                        marginTop:3,
                        mx: 'auto',
                        maxWidth: 484,
                        flexGrow: 1,
                        borderRadius: 5,                         
                        bgcolor: '#cfd9df', 
                        height: 300,         
                    }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} alignItems='center'>
                            <Typography variant='h5'>{data[0]}</Typography>
                            <Typography variant='subtitle'>{dateFormat(data[1].current.dt)}</Typography>
                        </Grid>
                        <Grid item xs={4}><img alt='weather-icon' src={`${process.env.REACT_APP_WEATHER_URL}${data[1].current.weather[0].icon}@2x.png`} /></Grid>
                        <Grid item xs={4} textAlign='center'>
                            <Typography variant='h2'>{Math.round(data[1].current.temp)}°</Typography>
                        </Grid>
                        <Grid item xs={4} display='flex' justifyContent='center'>
                            <Typography variant='h6'><b>{capitalize(data[1].current.weather[0].description)}</b></Typography>
                            </Grid>
                        <Grid item xs ={12} textAlign='center'><Typography variant='h6'>Air Conditions</Typography></Grid>
                        <Grid item xs ={3}><Typography>Feels like<ThermostatIcon /></Typography>
                            <Typography><b>{Math.round(data[1].current.feels_like)}°</b></Typography>
                        </Grid>
                        <Grid item xs ={3}><Typography>Wind <AirIcon /></Typography>
                            <Typography><b>{Math.round(data[1].current.wind_speed)}</b> km/h</Typography>
                            </Grid>
                        <Grid item xs ={3}><Typography>Clouds <FilterDramaIcon /></Typography>
                            <Typography><b>{data[1].current.clouds} %</b></Typography>
                            </Grid>
                        <Grid item xs ={3}><Typography>Humidity <OpacityIcon /></Typography>
                            <Typography><b>{Math.round(data[1].current.humidity)} %</b></Typography>
                            </Grid>
                    </Grid>
                </Box>}
        </div>
    )
}

export default CurrentWeather