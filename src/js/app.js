import locations from "./store/locations";
import './plugins/materialize'
import '../css/style.css';
import formUI from './views/form';
import currencyUI from "./views/currency";
import flightUI from './views/flights';
import api from "./services/api-service";

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    
    const form = formUI.form;
    const favorites_btn = document.querySelector('.add-favorite');

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        onFormSubmit();
    });

    favorites_btn.addEventListener("click", (e) => {
        e.preventDefault();
        onFavoritesClick();
    });    

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        onFormSubmit();
    });    

    function initApp() {
        locations.init();
        formUI.setAutocompleteData(locations.getCityCountryList());
    }

    async function onFormSubmit() {
        const originLocationCode = locations.getCityCodeByKey(formUI.originValue);
        const destinationLocationCode = locations.getCityCodeByKey(formUI.destinationValue);
        const departureDate = formUI.departValue;
        const returnDate = formUI.returnValue;
        const cy = currencyUI.currencyValue;

        const search_flights = await locations.fetchTicketsByParams({
            originLocationCode, 
            destinationLocationCode,
            departureDate,
            adults: 1
        });

        console.log(search_flights);
        flightUI.renderFlights(search_flights);
    }
});