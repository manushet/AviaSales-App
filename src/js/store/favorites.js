import locations from "./locations";

class Favorite {
    constructor(locations) {
        this.favoriteList = [];
        this.getActiveFlights = locations.getActiveFlights.bind(locations);
    }

    getFavoriteList() {
        return this.favoriteList;
    }
    
    addToFavorites(flight_id) {
        if (!this.isInFavorites(flight_id)) {
            const activeFlights = this.getActiveFlights();
            const fav_flight = activeFlights.find(item => item.id === flight_id);
            this.favoriteList.push(fav_flight);
        }
    } 

    removeFromFavorites(flight_id) {     
        const newlist = this.favoriteList.filter(item => item.id !== flight_id);
        this.favoriteList = newlist;
    }
    
    isInFavorites(flight_id) {
        const res = this.favoriteList.find(item => item.id === flight_id);
        return res;
    }
}

const favorite = new Favorite(locations);

export default favorite;