import api from "../api-service";
import config from '../../config/api';
import axios from 'axios';

jest.mock('axios');

const flights = {
    data: {
        "id": "1", 
        "itineraries": [
            {
                "segments": [
                    {
                        "departure": {
                            "iataCode": "MAD",
                            "at": "2023-07-22T16:40:00"
                        },
                        "arrival": {
                            "iataCode": "MUC",
                            "at": "2023-07-22T19:15:00"
                        },
                        "carrierCode": "IB",
                        "number": "8714",
                        "aircraft": {
                            "code": "CRK"
                        },
                        "id": "129",
                        "numberOfStops": 0,
                    }
                ]
            }
        ], 
        "price": {
            "currency": "EUR",
            "total": "95.38",
        },        
    }
};

const locations = {
    "EWR": {
        "cityCode": "NYC",
        "countryCode": "US"
    },
    "MLA": {
        "cityCode": "MLA",
        "countryCode": "MT"
    },
    "BRU": {
        "cityCode": "BRU",
        "countryCode": "BE"
    }        
};
const aircraft = {"290": "EMBRAER 190 E2", "295": "EMBRAER 195 E2", "319": "AIRBUS A319", "320": "AIRBUS A320", "321": "AIRBUS A321", "332": "AIRBUS A330-200", "333": "AIRBUS A330-300"};
const currencies = {"EUR": "EURO"};
const carriers = {"KL": "KLM ROYAL DUTCH AIRLINES", "TU": "TUNISAIR", "QR": "QATAR AIRWAYS", "KM": "AIR MALTA", "AC": "AIR CANADA", "UX": "AIR EUROPA"};
const dictionaries = {locations, aircraft, currencies, carriers};
const data = {
    data: flights,
    dictionaries
}
const departure_date = "2023-07-22";
const departure_city = "Madrid, Spain";
const arrival_city = "Munich, Germany";

describe('test api service', () => {
    it('checks search flights request', async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve({data: data}));
        await expect(api.getPrices()).resolves.toEqual(data);
    });
});
