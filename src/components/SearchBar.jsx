import { React, useState } from 'react';
import { Input, InputAdornment, Typography, ListItem, List, ListItemText } from '@mui/material';
import { Search } from '@mui/icons-material';
import axios from 'axios';

const SearchBar = ({ searchInfo }) => {
    let [searchTerm, setSearchTerm] = useState("");
    let [cityInfo, setCityInfo] = useState([]);
    let [showList, setShowList] = useState(true)

    const fetchCitieslist = async () => {
        if (searchTerm != null && searchTerm.length > 0) {
            setShowList(true)
            const cities_URL = `${process.env.REACT_APP_GEO_URL}q=${searchTerm}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
            await axios.get(cities_URL)
                .then((response) => response.data)
                .then((cityList) => {
                    setCityInfo(cityList)
                })
                .catch(error => console.log('error', error));
        }
    }

    const handleClick = (name, lat, lon) => {
        setSearchTerm(name);
        setShowList(!showList);
        const cityParams = { name, lat, lon }
        searchInfo(cityParams);
    }

    return (
        <div>
            <div class="font-bold text-center text-4xl py-5">Open Weather</div>
            <div class="flex justify-center">
                <input
                    class="rounded-lg border max-h-9 w-2/5 pl-1 border-solid border 2 border-sky-500"
                    type='text'
                    placeholder='Search the city...'
                    value={searchTerm}
                    onChange={event => setSearchTerm(event.target.value)}
                    onKeyDown={fetchCitieslist}
                />
            </div>
            <div class="flex justify-center ">
                {showList ?
                    <div class="w-2/5 border-solid border-2 border-ski-500 rounded-lg border ">
                        {cityInfo.map((city, index) =>
                            <ul class="hover:bg-sky-200" key={index} onClick={() => handleClick(city.name, city.lat, city.lon)}>
                                {!city.state ? <li>{city.name}, {city.country}</li> : <li>{city.name}, {city.state}, {city.country}</li>}
                            </ul>)}
                    </div>
                    : <></>}
            </div>
        </div>
    )
}

export default SearchBar;

