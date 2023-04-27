import { React, useState } from 'react';
import { Input, InputAdornment, Typography, ListItem, List, ListItemText} from '@mui/material';
import { Search } from '@mui/icons-material';
import axios from 'axios';

const SearchBar = ({ searchInfo }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [cityInfo, setCityInfo] = useState([]);
    const [showList, setShowList] = useState()

    const fetchCitieslist = async () => {
        if(searchTerm.length <= 1)
        {
             setShowList(false)
        }
        else if (searchTerm !== null && searchTerm.length > 0) {
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
        setShowList(false);
        const cityParams = { name, lat, lon }
        searchInfo(cityParams);
    }

    return (
        <div><Typography variant='h4' sx={{ textAlign: 'center', height: '50px', m: 3 }}>Open Weather</Typography>
            <Input
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 1, m: 2, mx: 'auto',
                    borderRadius: 3,
                    height: 40,
                    boxShadow: 2,
                    maxWidth: 500,
                    flexFlow: 1,
                }}
                
                disableUnderline
                debounce='300'
                startAdornment={
                    <InputAdornment position='end'>
                        <Search />
                    </InputAdornment>
                }
                type='text'
                placeholder='Search for the city'
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)}
                onKeyDown={fetchCitieslist}
            />
            {showList ?
                <List sx={{
                    p: 1,
                    m: 1,
                    mx: 'auto',
                    maxWidth: 500,
                    flexGrow: 1,
                    borderRadius: 5,
                    position: 'absolute',
                    right: 20,
                    left:20,
                    zIndex: 0,
                    bgcolor: 'white'
                }}>
                    {cityInfo.map((city, index) =>
                        <ListItem
                            key={index}
                            onClick={() => handleClick(city.name, city.lat, city.lon)}
                            sx={{ ":hover": { bgcolor: '#cfd9df', borderRadius: 5 } }}>
                            {!city.state ? <ListItemText>{city.name}, {city.country}</ListItemText> : <ListItemText>{city.name}, {city.state}, {city.country}</ListItemText>}
                        </ListItem>
                    )}
                </List>
                : <></>}</div>
    )
}

export default SearchBar