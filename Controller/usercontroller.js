//handles all the functionalities related to users.

var path = require('path');
const bcrypt = require('bcrypt');

const validate = require('../util/validate.js');
const User = require('../model/User.js').User;
const user = require('../model/User.js');
const { response } = require('express');
const { send } = require('process');
const { use } = require('chai');
const { list } = require('mongodb/lib/gridfs/grid_store');

let currentUser

module.exports.getAll = async (req, res) => {
    var list = await User.getAll()
    console.log(list)
    if (list) {
        console.log('users list found')
        res.send(list)
    }
    else {
        console.log('no users found')
    }
}

module.exports.add = async (req, res) => {
    let name = req.body.name
    let email = req.body.email
    let password = req.body.password
    let login = false
    const salt = await bcrypt.genSalt(10);
    console.log()
    
    const hashed_password = await bcrypt.hash(password, salt);   

    
      
    
    let isValid = await validate.validateDetails(name, email)
    if (isValid) {
        let userOBJ = new User(name, email, hashed_password, login)
        x = userOBJ.add()
        res.send(x)
    }
    else {
        console.log('user not added')
        res.send("Error. User not added in the database")
    }
}

module.exports.list_all = user._get_users_collection() //design function in /user/User class


module.exports.delete = async (req, res) => {
    let name = req.params.id
    del = await User.delete(name)
    console.log("contact deleted")
    res.send(del)
}

module.exports.getUser = async (req, res) => {
    let name = req.params.id
    let userOBJ = await User.get(name)
    if (userOBJ.length > 0) {
        console.log('user found')
        res.send(userOBJ)
    } else {
        res.send("Error. no user found")
    }
}

module.exports.updateUser = async (req, res) => {
    let name = req.body.name
    // we should only let change name and password 
    // email should not be changed. 
    // if a different email is found 
    // return error saying no user exists.
    let email = req.body.email
    let password = req.body.password
    let watchlists = req.body.watchlists
    const salt = await bcrypt.genSalt(10);  
    const hashed_password = await bcrypt.hash(password, 10);   
    console.log(hashed_password)

    let isValid = await validate.validateDetails(name, email)
    if (isValid) {
        let message = await User.update(email, new User(name, email, hashed_password, watchlists))
        console.log('the contact was updated')
        res.send(message)
    }
    else {
        console.log('user not updated')
        res.send("Error. User could not be updated")
    }
}

module.exports.dologin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    //console.log(email)
    //console.log(password)
    await User.resetLogin()
    let userOBJ = await User.getbyemail(email)
    //console.log(userOBJ.password)


    //console.log(password)
    //console.log(userOBJ.password)
    const valid = await bcrypt.compare(password, userOBJ.password)

    if (valid) {
        
        currentUser = userOBJ
        console.log(currentUser.name)
        console.log('login success')
        res.send(userOBJ)
    } else {
        console.log("passwords don't match")
        res.send()
    }

    

}

module.exports.getlogin = async (req, res) => {
    let userOBJ = await User.getLogin()
    if (userOBJ) {
        console.log('login found')
        res.send(userOBJ)
    }
    else {
        console.log('login not found')
    }
}



module.exports.getcurrentuser = async (req, res) => {
    console.log('bal')
    console.log(currentUser+'hellocontrolleruser')
    return currentUser
}

module.exports.addlist = async (watchlist) => {
    try{
        currentUser.addlist(watchlist)
    }
    catch (err) {
        throw err
    }
}