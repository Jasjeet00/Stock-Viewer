var path = require('path');
const user = require('./usercontroller.js')
const WatchList = require('../model/Watchlist.js').WatchList
const validate = require('../util/validate.js')
const watchlistmodel = require('../model/Watchlist.js')

getAll = async (req, res) => {
    x = watchlistmodel.getAll()
    if (x) {
        console.log('watchlists found')
        res.send(x)
    }
    else {
        console.log('watchlists not found')
        res.send([])
    }
}

getWatchlist = (req, res) => {
    let name = req.params.id
    listx = user.getlist(name)
    if (listx.length > 0) {
        console.log("watch found")
        res.send(listx)
    }
    else {
        res.send("error. no watchlist found")
    }
}

addWatchlist = (req, res) => {
    let name = req.body.name
    console.log(user.currentUser)
    let valid = validate.validateWatchlistName(name, user.currentUser)
    if (valid) {
        let watchlistOBJ =  new WatchList(name)
        user.addlist(watchlistOBJ)
        res.send('watchlist added')
    }
    else {
        console.log('name already exists')
        res.send('watchlist cannot be added')
    }

}

additem = (req, res) => {
    let name = req.body.name
    let watchlistname = req.params.name
    let valid = validate.validateStockName()
    if(valid) {
        user.addstock(name, watchlistname)
        console.log('stock added to watchlist')
        res.send('added successfully')
    }
    else {
        console.log('stock cannot be added')
        res.send('could not be added')
    }

}

deleteWatchlist = (req, res) => {
    let name = req.params.id
    x = user.deletelist(name)

}

deleteitem = (req, res) => {
    let name = req.params.name //name is name of the stock
    let id = req.params.id //id is the watchlist's name 
    x = user.deletestock(name, id)
    if (x) {
        console.log('deleted stock from list')
        res.send('done deletion of item')
    }
    else {
        console.log('could not be deleted')
        res.send('not deleted')
    }
}

update = (req, res) => {
    let name = req.params.name
    let new_name = req.body.name
    let valid = validate.validateWatchlistName(new_name)
    if (valid) {
        x = user.updatelistname(name, new_name)
        if (x) {
            console.log('name updated of watchlist')
            res.send('update done')
        }
        else {
            console.log('could not update watchlist name')
            res.send('could not update')
        }
    } else {
        console.log('name already exists')
        res.send('could not change name')
    }
    

}

module.exports = {addWatchlist, additem, deleteWatchlist, deleteitem, getAll, getWatchlist}