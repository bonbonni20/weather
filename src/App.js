import './App.css';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast';
import axios from 'axios';

function App() {
  let [cityName, setCityName] = useState("");
  let [currentData, setCurrentData] = useState({});
  let [forecastData, setForecastData] = useState({});

  const handleSearchChange =async(searchInfo) =>
  {
    setCityName(searchInfo.name)
    console.log(cityName, "cityname from app")
    await axios.get(`${process.env.REACT_APP_ONE_CALL}lat=${searchInfo.lat}&lon=${searchInfo.lon}&exclude=minutely,hourly,alerts&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
                    .then(res => {
                      setCurrentData(res.data)
                      setForecastData(res.data)                     
                    })
                    .catch(error => console.log(error))
  }
   return (
    <div>
      <SearchBar searchInfo={handleSearchChange} />
      {currentData && <CurrentWeather data={[cityName, currentData]} /> }
      {forecastData && <Forecast data={forecastData} /> }
    </div>
  )
}

export default App; 
