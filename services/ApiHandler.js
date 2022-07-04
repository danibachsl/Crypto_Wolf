// service/index.js
const axios = require('axios');

class CryptosApi {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc'
      // https://example.p.rapidapi.com/?rapidapi-key=***************************
      // Copiar desde el .env => {API_KEY}
    });
  }

  getAllCryptos = () => this.api.get('/');



}


module.exports = CryptosApi;
