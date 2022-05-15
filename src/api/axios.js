import axios from 'axios';
axios.defaults.baseURL = 'https://belvo-wallet-challenge-api.herokuapp.com';

export default axios.create({
    baseUrl: 'https://belvo-wallet-challenge-api.herokuapp.com'
});