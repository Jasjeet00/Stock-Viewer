// controller file for stocks.

const { response } = require('express');
var path = require('path');
const Stock = require('../model/Stock').Stock
const apikey = 'OWRGCFLHD64KSF5W'
module.exports.getStock = (req, response) => {
    let name = req.params.id

    
    
    var request = require('request');
    var url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${name}&interval=5min&apikey=${apikey}&datatype=csv`

    console.log(url)

    stockOBJ = new Stock()



    request.get({
        url: url,
        json: true,
        headers: {'User-Agent': 'request'}
      }, (err, res, data) => {
        if (err) {
          console.log('Error:', err);
        } else if (res.statusCode !== 200) {
          console.log('Status:', res.statusCode);
        } else {
          // data is successfully parsed as a JSON object:
          console.log(data)
          stockOBJ.modelpricedata(data)
          stockOBJ.overview(data)
          response.send(data)
        }
    });

}

module.exports.searchStock = (req, response) => {
  let name = req.params.symbol
  var url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${name}&apikey=${apikey}`;

  var request = require('request');
  request.get({

      url: url,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        console.log('Error:', err);
      } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
      } else {
        // data is successfully parsed as a JSON object:
        response.send(data)
      }
  });
}