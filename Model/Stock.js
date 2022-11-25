//model for stock obj


// ?? each model of stock will be
// extracted info that we need for the app
// no need to pass whole objects from alphavantage API
// to the interface.
//  
// model contains :
//                  interactive graph
//                  financials info 
//                  price, and it's changes last 24h, month, etc.
//                  wiki info if available.
//                  stock holder info from SEC database/API.


class Stock {

    constructor() {
        console.log('stock instructor')
    }

    get() {
        //complete
    }
    
    modeldata(data) {
        console.log('modeldata')
    }

    overview(data) {
        console.log('overview')
    }

    modelpricedata(data) {
        console.log('model price data')
    }
}

module.exports.Stock = Stock