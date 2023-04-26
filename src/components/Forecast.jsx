import React from 'react'
import { Typography, Grid, Box } from '@mui/material';

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
                height: 50,
              }}
              key={index}
            >
              <Grid container spacing={1} alignItems='center'>
                <Grid item xs={3}><Typography variant='h7'>
                  {dateFormat(day.dt)}
                </Typography></Grid>
                <Grid item xs={3}><img alt='weather-icon' src={`${process.env.REACT_APP_WEATHER_URL}${day.weather[0].icon}.png`} /></Grid>
                <Grid item xs={3}> <Typography>{day.weather[0].main}</Typography></Grid>
                <Grid item xs={3} textAlign='end'>
                  <Typography variant='h8'>{Math.round(day.temp.min)}°/{Math.round(day.temp.max)}°</Typography>
                </Grid>
              </Grid>
            </Box>)}
        </Box>}
    </div>
  )
}

export default Forecast