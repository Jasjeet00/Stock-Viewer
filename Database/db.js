// database manager to store users and their watchlist in the database.

const MongoClient = require("mongodb").MongoClient
const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri, {useUnifiedTopology: true})
var db



async function connectToDB() {
    try {
        await client.connect();
        db = await client.db('users-db')
        console.log("Connected successfully to mongoDB")
    } catch (err) {
        throw err;
    }
}

async function getDB() {
    return db
}

async function closeDBConnection() {
    await client.close()
    return 'Connection closed'
}

module.exports = {connectToDB, getDB, closeDBConnection, db}