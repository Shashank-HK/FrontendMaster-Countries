const api = {
    all: 'https://restcountries.eu/rest/v2/all?fields=alpha3Code;name;capital;region;population;flag;',
    country: 'https://restcountries.eu/rest/v2/alpha/', // + code
    region: 'https://restcountries.eu/rest/v2/region/', // + region
    name: 'https://restcountries.eu/rest/v2/alpha/country?fields=name' //get name of country
}

export default api;