import api from "../api-service";

class Locations {
    constructor(api) {
        this.api = api;
        this.countries = null;
        this.cities = null;
    }

    init() {
        this.countries = this.api.getCountries();
        this.cities = this.api.getCities();
        return {
            countries: this.countries, 
            cities: this.cities, 
        };
    }

    getCitiesByCountryCode(code) {
        return this.cities.filter(city => city.country_code === code);
    }  
}

const locations = new Locations(api);

export default locations;