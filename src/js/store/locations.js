import api from "../services/api-service";
import { formatDate } from "../helpers/date";
import Loader from "../views/loader";

export class Locations {
    constructor(api, helpers) {
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.aircrafts = null;
        this.carriers = null;
        this.currencies = null;
        this.activeFlights = null;
        this.formatDate = helpers.formatDate;
    }

    init() {
        this.countries = this.serializeCountries(this.api.getCountries());
        this.cities = this.serializeCities(this.api.getCities());
        return {
            countries: this.countries, 
            cities: this.cities, 
        };
    }

    getActiveFlights() {
        return this.activeFlights;
    }

    getCityCountryList() {
        const citiesList = Object.values(this.cities).reduce((acc, city) => {
            acc[city.filter_name] = null;
            return acc;
        }, {});
        return citiesList
    }

    getCityCodeByKey(key) {
        const city = Object.values(this.cities).find(item => item.filter_name === key);
        return city.code;
    }

    getCityNameByCode(code) {   
        const city = this.cities[code];
        return city ? city.name : code;
    }    

    getCountryNameByCode(county_code) {
        return this.countries[county_code].name;
    }

    getAircraftByCode(code) {
        return this.aircrafts[code];
    }  

    getCarrierByCode(code) {
        return this.carriers[code];
    }    
    
    getCurrencyByCode(code) {
        return this.currencies[code];
    }      

    async fetchTicketsByParams(params) {
        Loader.showLoader();
        const response = await(this.api.getPrices(params));
        this.aircrafts = response.dictionaries.aircraft;
        this.carriers = response.dictionaries.carriers;
        this.currencies = response.dictionaries.currencies;
        this.activeFlights = this.serializeFlights(response.data);
        Loader.hideLoader();
        return this.activeFlights; 
    }

    serializeCountries(countries) {
        if (!Array.isArray(countries) || !countries.length) {
            return {};
        }
        return countries.reduce((acc, country) => {
            acc[country.code] = country;
            return acc;
        }, {});
    }

    serializeCities(cities) {
        if (!Array.isArray(cities) || !cities.length) {
            return {};
        }        
        return cities.reduce((acc, city) => {
            const country_name = this.getCountryNameByCode(city.country_code);
            const city_name = city.name || city.name_translations["en"];
            const filter_name = `${city_name}, ${country_name}`;
            acc[city.code] = {
                ...city,
                name: city_name,
                country_name,
                filter_name
            };
            return acc;
        }, {});
    }  
       
    serializeFlights(flights) {
        if (!Array.isArray(flights) || !flights.length) {
            return [];
        }         
        const new_flights = flights.map(flight => {
            const departure = flight.itineraries[0].segments[0].departure.iataCode;
            const departure_city_name = this.getCityNameByCode(departure);
            const departureDate = this.formatDate(flight.itineraries[0].segments[0].departure.at, "dd MMM yyyy hh:mm");

            const arrival = flight.itineraries[0].segments[0].arrival.iataCode;
            const arrival_city_name = this.getCityNameByCode(arrival);
            const arrivalDate = this.formatDate(flight.itineraries[0].segments[0].arrival.at, "dd MMM yyyy hh:mm");

            const aircraft = flight.itineraries[0].segments[0].aircraft.code;
            const aircraft_name = this.getAircraftByCode(aircraft);

            const carrier = flight.itineraries[0].segments[0].carrierCode;
            const carrier_name = this.getCarrierByCode(carrier);

            const currency = flight.price.currency;
            const currency_name = this.getCurrencyByCode(currency);

            return {
                id: flight.id,
                departure,
                departure_city_name,
                departureDate,
                arrival,
                arrival_city_name,
                arrivalDate,
                aircraft,
                aircraft_name,
                carrier,
                carrier_name,
                flightNumber: flight.itineraries[0].segments[0].number,
                numberOfStops: flight.itineraries[0].segments[0].numberOfStops,
                price: flight.price.total,
                currency,
                currency_name,
            }
        }); 
        return new_flights;      
    }
}


const locations = new Locations(api, {formatDate});

export default locations;