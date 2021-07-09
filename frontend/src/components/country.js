import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../config/api.js';
import routes from '../config/routes.js';
import NavBar from './navbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Country = (props) => {

    const [theme, setTheme] = useState('light');
    const [countryData, setCountryData] = useState();
    const [borderCountries, setBorders] = useState([]);
    const [languages, setLanguages] = useState();

    useEffect(() => {
        axios.get(`${api.country}${props.match.params.country}`)
        .then((res) => res.data)
        .then((data) => {
            setCountryData(data)
            setLanguages(data.languages.reduce((acc, curr) => acc ? `${acc},${curr.name}` : `${curr.name}`,''));
            getBorderNames(data);
        })
        .catch((error) => console.log(error));
    }, [props.match.params.country])

    const getBorderNames = (data) => {
        let borderObjs = [];
        let first = true;
            data.borders.slice(0,4).map((borderCode) => {
                axios.get(api.name.replace("country",borderCode))
                .then((result) => result.data)
                .then((nameData) => {
                    const obj = {
                        "code":borderCode, "name":nameData.name
                    }
                    if (first){
                        setBorders([obj]);
                        first=false;
                    }
                    else{
                    setBorders(countries => [...countries, obj] )
                    }
                })
            })
    }

    const toggleTheme = () => {
        theme=='dark' ? setTheme('light') : setTheme('dark');
    }

    const CountryInfo = () => (
        
        <div id="country">
        <div id="back">
            <div id="back-button"><Link to={{pathname:routes.homePage}} className="link"><FontAwesomeIcon icon={faArrowLeft} />&nbsp;&nbsp;&nbsp;Back</Link></div>
        </div>
        
        <div className="flag">
        <img src={countryData.flag} />
        </div>
        <div className="info">
            <div id="title">
                <p>{countryData.name}</p>
            </div>
            <div className="info-column">
                <p><span className="info-text">Native Name:</span> {countryData.nativeName}</p>
                <p><span className="info-text">Population:</span> {countryData.population}</p>
                <p><span className="info-text">Region:</span> {countryData.region}</p>
                <p><span className="info-text">Sub Region:</span> {countryData.subregion}</p>
                <p><span className="info-text">Capital:</span> {countryData.capital}</p>
            </div>
            <div className="info-column">
                <p><span className="info-text">Top Level Domain:</span> {countryData.topLevelDomain[0]}</p>
                <p><span className="info-text">Currencies:</span> {countryData.currencies[0].name}</p>
                <p><span className="info-text">Languages:</span> {languages}</p>
            </div>
            <div className="border">
                <span id="border-text" className="info-text">Border Countries:</span>
                <div className="border-div">
                {borderCountries.map((borderCountry) => (
                    <div class="border-button"><Link className="link" to={{pathname:`/country/${borderCountry.code}`}}>{borderCountry.name}</Link></div>
                ))}
                </div>
            </div>
        </div>
    </div>
    )

    return (
        <>
       
        <div id="country-wrapper" data-theme={theme}>
        <NavBar selectTheme={toggleTheme} />
        {countryData != null && borderCountries.length>0 ?  < CountryInfo /> : <p>Here</p>}
        </div>
        </>
    )
}

export default Country;