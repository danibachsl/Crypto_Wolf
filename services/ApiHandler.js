// service/index.js
const axios = require('axios');

class CryptosApi {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.coingecko.com/api/v3/coins'
      //        https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1
    });
  }

  getAllCryptos = () => this.api.get('/markets?vs_currency=usd&order=market_cap_desc');

  getCryptoData = () => this.api.get('/bitcoin/market_chart?vs_currency=usd&days=1');

}


module.exports = CryptosApi;
