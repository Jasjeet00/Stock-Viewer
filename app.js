const express = require('express')
const stock  = require('./controller/stockcontroller.js')
const user = require('./controller/usercontroller.js')
const watchlist = require('./controller/watchlistcontroller.js')
const port = 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}));


app.use(express.static(__dirname + '/public/'));

app.listen(port, () => {
    console.log('stockapp api listening at http://localhost:%d', port);
})

app.get('/', () => {
   console.log('hello')
})

app.get('/search/:symbol', stock.searchStock)
app.get('/stock/:id', stock.getStock)

//user functions.
app.get('/user/', user.getAll)
app.get('/user/:id', user.getUser)
app.post('/user/', user.add)
app.put('/user/:id', user.updateUser)
app.delete('/user/:id', user.delete)


//implement to get and update user stocks in watchlists.
//verify if the user has logged in or not.
//each watchlist request will have user name and compare with login user
// watchlist add get update delete
// stock add in /watchlist/:stocksymbol
app.get('/watchlist/', watchlist.getAll) // get all watchlists.

app.get('/watchlist/:id', watchlist.getWatchlist) //get specific watchlist by name.
app.post('/watchlist/', watchlist.addWatchlist) //adding a watchlist
app.post('/watchlist/:id', watchlist.additem) //add stock name to a specific watchlist.

app.delete('/watchlist/:id', watchlist.deleteWatchlist) //deleting whole watchlist by name
app.delete('/watchlist/:id/:name', watchlist.deleteitem)  //deleting specific stock from a specific watchlist.

app.put('watchlist/:id', function(req, res){
    watchlist.update
  });
//app.put('watchlist/:id', watchlist.update) // only name change is allowed 

app.post('/user/login/', user.dologin) //login function that manages who is currently logged in.
app.get('/user/login/', user.getlogin)





