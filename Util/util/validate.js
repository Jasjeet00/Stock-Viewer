// validate function to check if all details entered for user are correct?

//check name is unique
// email is valid 
// password has all cases and specific characters, numbers etc.
var path = require('path');
const user = require('../model/User.js');

const { uniqueID } = require('mocha/lib/utils');
let validator = require('validator');


async function uniquename(name1) {
    let name = name1
    let users = await user._get_users_collection()
    x = users.find({'name': name}).toArray()
    if (x.length > 0) {
        console.log('name is not unique')
        return false
    }
    else {
        console.log('name is unique')
        return true
    }

}

async function uniqueemail(email1) {
	let email =email1
    let users = await user._get_users_collection()
    x = users.find({'email': email}).toArray()
    if (x.length > 0) {
        console.log('email is not unique')
        return false
    }
    else {
        console.log('email is unique')
        return true
    }

}

let _validate_name = (name) => {
	return new Promise((resolve, reject) => {
		name = name.split(' ').join(''); //Removing blanks
		let is_valid = validator.isAlphanumeric(name) && uniquename(name);
		if (is_valid){
			resolve('The name is valid.');
		} else {
			reject('The name is invalid.');
		}
	});
};

let _validate_email = (email) => {
	return new Promise((resolve, reject) => {
		let is_valid = validator.isEmail(email) && uniqueemail(email);
		if (is_valid){
			resolve('The email is valid.');
		} else {
			reject('The email is invalid.');
		}
	});
};

module.exports.validateWatchlistName = (name, userOBJ) => {
    var found = false
	console.log(userOBJ)
    let names = userOBJ.watchlists
	console.log(names)
    for (var x of names) {
        if (name === x) {
			found = true
		}
    }

    return !found
}

module.exports.validateStockName = (name) => {
    //we'll search using symbol
}


module.exports.validateDetails = (name, email) => {
	return Promise.all([_validate_name(name), _validate_email(email)])
		.then((values) => {
			return true;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
};
