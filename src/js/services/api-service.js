import axios from "axios";
import qs from "qs";
import config from '../config/api';
import countries from '../data/countries.json';
import cities from '../data/cities.json';
class Api {
    constructor(config) {
        axios.defaults.headers.get['Content-Type'] = 'application/json';
        axios.defaults.headers.get['X-Access-Token'] = this.token;        
        this.url_base = config.url_base;
        this.api_key = config.api_key;
        this.api_secret = config.api_secret;  
        this.token = null;    
        this.tokenTimestamp = null;     
        this.process = 'idle'; 
    }

    getCountries() {
        try {
            return countries;
        }
        catch(err) {
            console.log(err);
        }
    }

    getCities() {
        try {
            return cities;
        }
        catch(err) {
            console.log(err);
        }        
    }  

    async getToken() {       
        if (this.token && this.tokenTimestamp < Date.now()) {
            return this.token;
        }

        let data = qs.stringify({
            'grant_type': 'client_credentials',
            'client_id': this.api_key,
            'client_secret': this.api_secret 
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${this.url_base}/v1/security/oauth2/token`,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        };

        try {
            const response = await axios.request(config);     
            this.token = response.data.access_token;    
            this.tokenTimestamp = parseInt(Date.now()) + parseInt(response.data.expires_in); 
            return this.token;           
        }
        catch(err) {
            console.log(err);
        }
    }  
      
    async getAirlines() {     
        const token = await this.getToken();        

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${this.url_base}/v1/reference-data/airlines`,
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            }
        };
        try {
            const response = await axios.request(config);
            return response.data;
        }
        catch(err) {
            console.log(err);
        }          
    }    
   
    async getPrices(params) {     
        const token = await this.getToken();        
        const url_params = new URLSearchParams(params).toString();

        const url = `${this.url_base}/v2/shopping/flight-offers?${url_params}`;
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: url,
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            }
        };
        try {
            const response = await axios.request(config);
            return response.data;
        }
        catch(err) {
            console.log(err);
        }          
    }
}

const api = new Api(config);

export default api;

