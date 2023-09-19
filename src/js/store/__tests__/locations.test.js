import locations, {Locations} from '../locations';
import { formatDate } from '../../helpers/date';
import api, {Api} from '../../config/api';

const countries = [{code: 'MX', name: 'Mexico'}];
const cities = [{country_code: "MX", name: "Mexico City", code: "MEX"}];

jest.mock('../../services/api-service', () => {
    const mockApi = {
        countries: jest.fn(() => Promise.resolve([{code: 'MX', name: 'Mexico'}])),
        cities: jest.fn(() => Promise.resolve([{country_code: "MX", name: "Mexico City", code: "MEX"}])),
    }
    return {
        Api: jest.fn(() => mockApi)
    }
});

describe('Location Store tests', () => {
    beforeEach(() => {
        locations.countries = locations.serializeCountries(countries);
        locations.cities = locations.serializeCities(cities);
    });
    
    it('locationInstance is instance of Location class', () => {
        expect(locations).toBeInstanceOf(Locations);
    });
    
    it('Locations instance has been successfully created', () => {
        const instance = new Locations(api, {formatDate});
        expect(instance.countries).toBe(null);
        expect(instance.cities).toBe(null);
        expect(instance.formatDate).toEqual(formatDate);
    });

    it('countries serialization is correct', () => {
        const res = locations.serializeCountries(countries);
        const expectedData = {
            'MX': {code: 'MX', name: 'Mexico'}
        }; 
        expect(res).toEqual(expectedData);
    });   
    
    it('countries serialization with incorrect data', () => {
        const res = locations.serializeCountries(null);
        const expectedData = {}; 
        expect(res).toEqual(expectedData);
    });   
    
    it('cities serialization is correct', () => {
        const res = locations.serializeCities(cities);
        const expectedData = {
            'MEX': {
                code: 'MEX', 
                name: 'Mexico City', 
                country_code: "MX",
                country_name: 'Mexico', 
                filter_name: `Mexico City, Mexico`}
        }; 
        expect(res).toEqual(expectedData);
    });    
    
 
    it('get correct city name by city code', () => {
        const res = locations.getCityNameByCode("MEX");
        const expectedData = 'Mexico City';
        expect(res).toEqual(expectedData);
    });     
});