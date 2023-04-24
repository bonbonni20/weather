import { cleanup, render, screen } from '@testing-library/react';
import App from './App';
import axios from 'axios'

jest.mock("axios")

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


const dummyCityList = [
  {
    name: "London",
    state: "Texas",
    country: "US",
  },
  {
    name:"London",
    state: "England",
    country: "GB",
  },
  {
    name:"London",
    state: "Ontario",
    country: "CA",
  }
]
const dummyWeatherInfo = [
  {
    lat: 33.44,
    lon: -94.04,
    current : {
      dt: "1682297371",
      temp: 9.04,
      feels_like: 8.51
    },
    daily: [{
      dt: "1682359200",
      temp: { min: 6.62, max: 18.62},
      feels_like: {day: 13.87 }
    }]
  }
]

test("city list", async () => {
  axios.get.mockResolvedValue({data: dummyWeatherInfo});
  render(<App />);

  const cityList = await waitFor(() => screen.findAllByCityName("city"));
  expect((cityList).toHaveLength(3));
})

test("current weather", async () => {
  axios.get.mockResolvedValue({data: dummyWeatherInfo });
  render(<App />);

  const currentWeather = await waitFor(() => screen.findAllByLatAndLon("lat", "lon"));
  expect((currentWeather).toHaveLength(3));
})

// functions
// 1. searchbar
// 2. currentweather => (further func: more detail(hourly))
// 3. forecast => (further func: same as 2)
// 4. 