import axios from "axios";
import config from '../config/api';
import countries from '../data/countries.json';
import cities from '../data/cities.json';

class Api {
    constructor(config) {
        this.url_base = config.url_base;
        this.token = config.token;
        this.marker = config.marker;
    }

    getCountries() {
        try {
            return countries;
        }
        catch(err) {
            console.log(err);
        }
    }

    getCities() {
        try {
            return cities;
        }
        catch(err) {
            console.log(err);
        }        
    }  
    
    async getPrices(cityCodeFrom, cityCodeTo) {
        try {
            const response = await axios.get(`${this.url_base}/v1/cities/${cityCodeFrom}/directions/${cityCodeTo}/prices.json?city_id=${cityCodeFrom}&direction_id=${cityCodeTo}`);
            console.log(response);
        }
        catch(err) {
            console.log(err);
        }        
    }
}

const api = new Api(config);

export default api;

