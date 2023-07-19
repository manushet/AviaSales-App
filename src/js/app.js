import locations from "./store/locations";
import favorites from "./store/favorites";
import favoriteListUI from './views/favoriteList';
import './plugins/materialize'
import '../css/style.css';
import formUI from './views/form';
import currencyUI from "./views/currency";
import flightUI from './views/flights';
import api from "./services/api-service";

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    
    const form = formUI.form;
    const tickets_sections = document.querySelector('.tickets-sections');
    const favorites_dropdown = document.getElementById('dropdown1');
    
    tickets_sections.addEventListener("click", (e) => {
        e.preventDefault();
        const favorite_links = document.querySelectorAll('.tickets-sections .container .row .add-favorite');
        favorite_links.forEach(el => {
            if (e.target === el) {
                onAddFavoritesClick(el);     
            }
        });
    });  
    
    favorites_dropdown.addEventListener("click", (e) => {
        e.preventDefault();
        const favorite_delete_links = document.querySelectorAll('#dropdown1 .delete-favorite');
        favorite_delete_links.forEach(el => {
            if (e.target === el) {
                onFavoriteDeleteClick(el);     
            }
        });
    });      

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        onFormSubmit();
    });

    function initApp() {
        locations.init();
        formUI.setAutocompleteData(locations.getCityCountryList());
        favoriteListUI.renderFavoriteList(favorites.getFavoriteList());
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
        flightUI.renderFlights(search_flights);
        
    }

    function onAddFavoritesClick(flight_link) {
        const flight_id = flight_link.getAttribute("data-flight");
        console.log(flight_id);

        flight_link.setAttribute("disabled", true);
        flight_link.innerHTML = "Added to favorites!";
        flight_link.style.backgroundColor = 'grey';

        favorites.addToFavorites(flight_id);
        favoriteListUI.renderFavoriteList(favorites.getFavoriteList());
    }

    function onFavoriteDeleteClick(flight_link) {
        const flight_id = flight_link.getAttribute("data-flight");
        const favorite_links = document.querySelectorAll('.tickets-sections .container .row .add-favorite');
        favorite_links.forEach(el => {
            const el_flight = el.getAttribute("data-flight");
            if (flight_id === el_flight) {
                el.setAttribute("disabled", false);
                el.removeAttribute("disabled");
                el.innerHTML = "Add to favorites";
                el.style.backgroundColor = '';                
            }
        });        
        favorites.removeFromFavorites(flight_id);
        favoriteListUI.renderFavoriteList(favorites.getFavoriteList());
    }    

});