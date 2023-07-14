import locations from "./services/store/locations";
import './plugins/materialize'
import '../css/style.css';

const res = locations.init();
console.log(locations);

console.log(locations.getCitiesByCountryCode("PF"));