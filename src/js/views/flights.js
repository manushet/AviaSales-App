import currencyUI from './currency';

class FlightUI {
    constructor(currency) {
        this.container = document.querySelector('.tickets-sections .container .row');
        this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
    }

    renderFlights(flights) {
        this.clearContainer();

        if (!flights.length) {
            this.showEmptyMsg();
            return;
        }

        let currency_symbol = this.getCurrencySymbol();
        let fragment = '';
        flights.forEach(flight => {
            const template = FlightUI.flightTemplate(flight);
            fragment += template;
        });
        this.container.insertAdjacentHTML('afterbegin', fragment);
    }

    clearContainer() {
        this.container.innerHTML = "";
    }
    
    showEmptyMsg() {
        const template = FlightUI.emptyMsgTemplate();
        this.container.insertAdjacentHTML('afterbegin', template);
    }
    
    static emptyMsgTemplate() {
        return `
            <div class="tickets-empty-res-msg">
                По вашему запросу предложений не найдено.
            </div>        
        `;
    }

    static flightTemplate(flight) {
        return `
         <div class="col s12 m6">
            <div class="card ticket-card">
              <div class="ticket-airline">
                <span class="ticket-airline-name">${flight.carrier_name}</span>
                <span class="ticket-aircraft-name">${flight.aircraft_name}</span>
              </div>
              <div class="ticket-destination d-flex align-items-center">
                <div class="d-flex align-items-center mr-auto">
                  <span class="ticket-city">${flight.departure_city_name}</span>
                  <i class="medium material-icons">flight_takeoff</i>
                </div>
                <div class="d-flex align-items-center">
                  <i class="medium material-icons">flight_land</i>
                  <span class="ticket-city">${flight.arrival_city_name}</span>
                </div>
              </div>
              <div class="ticket-time-price d-flex align-items-center">
                <span class="ticket-time-departure">${flight.departureDate}</span>
                <span class="ticket-price ml-auto">${flight.price} ${flight.currency_name}</span>
              </div>
              <div class="ticket-additional-info">
                <span class="ticket-transfers">Number of stops: ${flight.numberOfStops}.</span>
                <span class="ticket-flight-number">Flight No. ${flight.flightNumber}</span>
              </div>
              <a class="waves-effect waves-light btn-small green darken-1 add-favorite ml-auto" data-flight="${flight.id}">Add to favorites</a>              
            </div>
          </div>        
        `;
    }
}

const flightUI = new FlightUI(currencyUI);

export default flightUI;