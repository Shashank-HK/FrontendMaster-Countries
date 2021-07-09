import React from 'react';
import {useState} from 'react';
import { useHistory } from 'react-router-dom';
import routes from '../config/routes';

const Card = ({country, theme}) => {

    const history = useHistory();
    const [code, setCode] = useState(country.alpha3Code);

    const redirect = () => {
        history.push({
            pathname: `/country/${code}`,
           state: {theme : theme}
        })
    }

    return (
        <>
        <div id="card" onClick={redirect}>
            <div className="img-container">
                <img src={country.flag} />
            </div>
            <div className="content">
                <p className="country-name">{country.name}</p>
                <p><span className="info-text">Population:</span> {country.population.toLocaleString()}</p>
                <p><span className="info-text">Region:</span> {country.region}</p>
                <p><span className="info-text">Capital:</span> {country.capital}</p>
            </div>
        </div>
        </>
    )
}

export default Card;