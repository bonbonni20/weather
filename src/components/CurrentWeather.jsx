import React from 'react'
import { Typography, Grid, Box, capitalize } from '@mui/material';

const CurrentWeather = ({ data }) => {
    const dateFormat = (dateValue) => {
        let date = new Date(dateValue * 1000);
        let options = {
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
                        mx: 'auto',
                        maxWidth: 500,
                        flexGrow: 1,
                    }}>
                    <Grid container spacing={1} alignItems='center' sx={{ bgcolor: '#cfd9df', borderRadius: 5 }}>
                        <Grid item xs={12}>
                            <Typography variant='h5'>{data[0]}</Typography>
                            <Typography variant='subtitle'>{dateFormat(data[1].current.dt)}</Typography>
                        </Grid>
                        <Grid item xs={4}><img alt='weather-icon' src={`${process.env.REACT_APP_WEATHER_URL}${data[1].current.weather[0].icon}@2x.png`} /></Grid>
                        <Grid item xs={4} textAlign='center'>
                            <Typography className="temp_info" variant='h3'>{Math.round(data[1].current.temp)}°</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant='h6'><b>{capitalize(data[1].current.weather[0].description)}</b></Typography>
                            <Typography> Feels like <b>{Math.round(data[1].current.feels_like)}°</b></Typography>
                            <Typography> Wind <b>{Math.round(data[1].current.wind_speed)} km/h</b></Typography>
                            <Typography> Humidity <b>{Math.round(data[1].current.humidity)}%</b></Typography>
                        </Grid>
                    </Grid>
                </Box>}
        </div>
    )
}

export default CurrentWeather