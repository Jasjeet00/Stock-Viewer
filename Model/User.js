//defines a User object to be used with Database

const client = require('../database/db.js');

async function _get_users_collection (){
    await client.connectToDB()
    let db = await client.getDB();
    //console.log(await db.collection('users'))
    return await db.collection('users');
    
};



class User{
    constructor(name, email, hash_password, login=false, watchlists = []) {
        this.name = name
        this.email = email
        this.password = hash_password
        this.watchlists = watchlists
        this.login = login
    }


    //create class with empty watchlist array
    async add() {
        //adds the self to database
        try {
            let collection = await _get_users_collection();
            let mongoObj = await collection.insertOne(this);
            console.log('User was added in the database with id -> '+mongoObj.insertedId);
            return ('added success' + mongoObj.insertedId)
        } catch (err) {
            throw err
        }
    }

    static async update(email, userOBJ) {
        // find user with email and replace.
        // if email not found. send error
        let collection = await _get_users_collection();
        let new_values = {$set: {'name': userOBJ.name, 'email': userOBJ.email, 'password': userOBJ.password, 'watchlists': userOBJ.watchlists}}
        let obj = await collection.updateOne({'email': email}, new_values)
        if (obj.modifiedCount > 0){
            return 'Contact correctly updated.';
        }else{
            return 'Contact was not updated'
        }
    }
    
    static async delete(name) {
        let collection = await _get_users_collection();
        let obj = await collection.deleteOne({'name': name})
        if (obj.deletedCount > 0) {
            return 'user deleted'
        } else {
            return 'user not found'
        }
    }

    async changeLogin(login) {
        this.login = login
    }

    static async get(name) {
        let collection = await _get_users_collection()
        let obj = await collection.find({"name": name}).toArray()
        return obj
    }

    static async getAll(){
        let collection = await _get_users_collection();
        let objs = await collection.find({}).toArray();
        return objs;                
    }

    static async getbyemail(email) {
        let collection = await _get_users_collection()
        
        let obj = await collection.find({"email": email}).toArray()
        return obj[0]
    }

    static async getLogin() {
        let collection = await _get_users_collection()
        let obj = await collection.find({"login": true}).toAarray()
        return obj[0]
    }

    static async resetLogin() {
        let collection = await _get_users_collection()
        let cursor = collection.find()
        cursor.each(function(err, item) {
            item.login = false
        })
    }

    async getlist(name) {
        x = this.watchlists.find({'name' : name}).toArray()
        if (x.length > 0) {
            console.log('watchlist found')
            return x.get()
        }
        else {
            console.log('watchlist not found')
            return 
        }
    }

    async addlist(watchlistOBJ) {
        this.watchlists.push(watchlistOBJ)
        this.update(this.email, this) //updating the self object in database.
    }

    async addstock(name, watchlistname) {
        x = this.watchlists.find({'name' : watchlistname}).toArray()
        if (x > 0) {
            x.add_current(name)
        }
        else {
            console.log('could not find watchlist with that name')
        }
        this.update(this.email, this) //updating the self object in database.
    }

    async deletestock(name, id) {
        x = this.watchlists.find({'name' :id}).toArray()
        x = x.filter(item => item !== name)
        //might have to update Watchlist model also
        this.update(this.email, this)
    }

    async updatelistname(name, new_name) {
        x = this.watchlists.find({'name': name}).toArray()
        obj = x.updatename(name, new_name)
        if (obj) {
            console.log('name updated')
        }
        else {
            console.log('could not find watchlist with that name')
        }
        this.update(this.email, this)
    }

    async getalllists() {
        return this.watchlists
    }

}

module.exports.User = User
module.exports._get_users_collection = _get_users_collection