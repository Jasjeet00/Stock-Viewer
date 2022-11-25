var path = require('path');
const user = require('../controller/usercontroller.js')


class WatchList{


    


    constructor(name,list = []){
        this.name = name;
        this.list = list;
    }

    async add_new(){ // adds a new watchlist 
        try{

            let collection = await get_watchlist();
            let mongobj = await list.insertOne(this);
            console.log('watchlist was added in the database with the name -> '+mongobj.insertName);
        }catch(err){
            throw err
        }
    }





    // deletes the mentioned watchlist
    async delete(name){
        let collection = await get_wachlist();
        let obj = await wlist.deleteOne({'name':name})
        if(obj.deletedCount>0){

            return 'watchlist deleted'
        } else{

            return 'watchlist not found'
        }
    }




    async add_current(name){
        this.list.push(name)
    }

    async get(name){// getter for specified watchlist 
        return self.list
    }

    async updatename(new_name) {
        this.name = new_name
    }

    async getAll() {
        userOBJ = user.getlogin()
        return userOBJ.getAllWatchlist()
    }

}

module.exports.WatchList = WatchList
module.exports.getAll = async () => {
    userOBJ = await user.getcurrentuser()
    console.log(userOBJ+'hello')
    return await userOBJ.getalllists()
}
