import React from 'react';
import axios from 'axios';
import { Grid, Container } from '@material-ui/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faAngleDown} from '@fortawesome/free-solid-svg-icons';
import {useState, useEffect} from 'react';
import api from '../config/api.js';
import Card from './card.js';
import NavBar from './navbar.js';

const Main = (props) => {
    const [theme, setTheme] = useState(props.location.state!=undefined ? props.location.state.theme_child : 'light');
    const [countries, setCountries] = useState([]);
    const [region, setRegion] = useState('');
    const [search, setSearch] = useState('');
    const [listOpen, setListOpen] = useState(false);

    useEffect (() => {
        axios.get(api.all)
        .then((res) => res.data)
        .then((allData) => {
            setCountries(allData);
        })
        .catch((error) => console.log(error));
    },[])

    const toggleTheme = () => {
        theme=='dark' ? setTheme('light') : setTheme('dark');
    }

    const toggleDropdown = () => {
        setListOpen(!listOpen);
        console.log(listOpen)
    }
    
    const Dropdown = () => (
        <div className="dd-wrapper" onClick={toggleDropdown}>
            <div className="dd-header">
                <p className="dd-title">{region=='' ? 'Filter by Region' : region}</p>
                <FontAwesomeIcon icon={faAngleDown} />
            </div>
            { listOpen &&
            <div className="dd-list">
                <p onClick={(e) => setRegion(e.target.innerText)} className="dd-list-item">Africa</p>
                <p onClick={(e) => setRegion(e.target.innerText)} className="dd-list-item">America</p>
                <p onClick={(e) => setRegion(e.target.innerText)} className="dd-list-item">Asia</p>
                <p onClick={(e) => setRegion(e.target.innerText)} className="dd-list-item">Europe</p>
                <p onClick={(e) => setRegion(e.target.innerText)} className="dd-list-item">Oceania</p>
                <p onClick={(e) => setRegion('')} className="dd-list-item">Clear Filter</p>
            </div>
            }
        </div>
    )

    return(
        <>
        <div id="main" data-theme={theme}>
            < NavBar selectTheme={toggleTheme} curTheme={theme} />
            <div className="input_div">
                <div id="search-box">
                <FontAwesomeIcon className="icon" icon={'fas', faSearch} />
                <input id="search-input" type="text" 
                onChange={(e) => {setSearch(e.target.value)}} placeholder="Search for a country..."/>
                </div>
                <Dropdown />
            </div>
            <Container id="container">
            <Grid className="grid-container" container alignItems="stretch" spacing={5}>
            {countries.map((country) => {
                if(country.region.includes(region) && country.name.toLowerCase().includes(search.toLowerCase())){
                return(
                <Grid className="grid-item" item key={country.alpha3Code} xs={12} sm={6} lg={3}>
                    <Card country={country} theme={theme} />
                </Grid>
                )
            }
            }
            )}
            </Grid> 
            </Container>
        </div>
        </>
    )
}

export default Main;