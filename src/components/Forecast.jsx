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
        <Box sx={{ maxWidth: 500, mx: 'auto', }}>
          {data.daily.map((day, index) =>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                p: 1,
                m: 1,
                mx: 'auto',
                maxWidth: 500,
                flexGrow: 1,
                borderRadius: 5,
                bgcolor: '#cfd9df',
                height: 135,
              }}
              key={index}>
              <Grid container spacing={{xs: 2, md: 3}} alignItems='center'>
                <Grid item xs={3}><Typography> <b>{dateFormat(day.dt)}</b></Typography></Grid>
                <Grid item xs={2}><img alt='weather-icon' src={`${process.env.REACT_APP_WEATHER_URL}${day.weather[0].icon}.png`} /></Grid>
                <Grid item xs={2}><Typography><b>{day.weather[0].main}</b></Typography></Grid>
                <Grid item xs={2}>
                  <Typography><ThermostatIcon /></Typography>
                  <Typography><b>{Math.round(day.temp.min)}°/{Math.round(day.temp.max)}°</b></Typography>
                  <Typography><FilterDramaIcon /></Typography>
                  <Typography> <b>{Math.round(day.feels_like.day)}°/{Math.round(day.feels_like.night)}°</b></Typography>
                </Grid>
                <Grid item xs={2} >
                  <Typography><AirIcon /></Typography>
                  <Typography> <b>{Math.round(day.wind_speed)}</b> km/h</Typography>
                  <Typography><OpacityIcon /></Typography>
                  <Typography> <b>{Math.round(day.humidity)}</b> %</Typography>

                </Grid>

              </Grid>
            </Box>)}
        </Box>}
    </div >
  )
}

export default Forecast