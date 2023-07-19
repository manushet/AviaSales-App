class FavoriteListUI {
    constructor() {
        this.container = document.getElementById('dropdown1');
    }
    
    renderFavoriteList(items = []) {
        this.clearContainer();
        let fragment = "";
        if (!items.length) {
            this.renderEmptyContainer();
            return;
        }
        items.forEach(item => {
            const el = this.renderFavoriteItem(item);
            fragment += el;
        });
        this.container.insertAdjacentHTML('afterbegin', fragment);
    }

    clearContainer() {
        this.container.innerHTML = "";
    } 

    renderEmptyContainer() {
        this.container.innerHTML = "<p>Вы не добавили предложения в избранное.</p>";
    }

    renderFavoriteItem(item) {
        return `
            <div class="favorite-item  d-flex align-items-start">
                
                <div class="favorite-item-info d-flex flex-column">
                    <div class="favorite-item-carrier d-flex align-items-center">
                        <span>${item.carrier_name}</span><span>${item.aircraft_name}</span>
                    </div>
                    <div class="favorite-item-destination d-flex align-items-center">
                        <div class="d-flex align-items-center mr-auto">
                            <span class="favorite-item-city">${item.departure_city_name}</span>
                            <i class="medium material-icons">flight_takeoff</i>
                        </div>
                        <div class="d-flex align-items-center">
                            <i class="medium material-icons">flight_land</i>
                            <span class="favorite-item-city">${item.arrival_city_name}</span>
                        </div>
                    </div>
                    <div class="ticket-time-price d-flex align-items-center">
                        <span class="ticket-time-departure">${item.departureDate}</span>
                        <span class="ticket-price ml-auto">${item.price} ${item.currency_name}</span>
                    </div>
                    <div class="ticket-additional-info">
                        <span class="ticket-transfers">Пересадок: ${item.numberOfStops}.</span>
                        <span class="ticket-flight-number">Номер рейса: ${item.flightNumber}</span>
                    </div>
                    <a class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto" data-flight="${item.id}">Delete</a>
                </div>
            </div>        
        `;
    }
}

const favoriteListUI = new FavoriteListUI();

export default favoriteListUI;