import React, {useState} from 'react'
import { AsyncPaginate } from 'react-select-async-paginate';

const Search = ({onSearchChange}) => {
let [search, setSearch] = useState(null)

let apiKey = '2848195f80ab69cb3bd3003ab44f492d'
    const fetchCitieslist = (value) => {
        const cities_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${apiKey}`
        return fetch(cities_URL)
          .then(response => response.json())
          .then(cityList => {
            return {
              options: cityList.map((city) => {
                return {
                  value: `${city.lat} ${city.lon}`,
                  label: (!city.state) ? `${city.name}, ${city.country}` : `${city.name}, ${city.state}, ${city.country}`
                }
              })
            }
          })
          .catch(error => console.log('error', error));
      }

    const handleClick = (value) => {
        setSearch(value)
        onSearchChange(value)
    }
  return (
    <div className='search_section'>
    <AsyncPaginate
      className='search_bar'
      placeholder="Search for a city"
      debounceTimeout={600}
      value={search}
      onChange={handleClick}
      loadOptions={fetchCitieslist} />
  </div>
  )
}

export default Search