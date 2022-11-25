
var assert = require('assert');
const User = require('../model/User').User;
const validation = require('../util/validate.js');


const axios = require('axios');
const { use } = require('chai');

var myurl = 'http://localhost:3000';




//Lets configure the base url
const instance = axios.create({



    baseUrl: myurl,
    timeout: 4000,
    headers:{'content-type': 'application/json'}

});



// Adding a new user

describe('user controller - Tests with Mocha',function(){

    describe('Test Models',function(){
        describe('User',function(){

            let uname = 'Mark Brown';
            let uemail = 'mark00@gmail.com';
            let upassword = 'mark1234'

            let user = new User(uname,uemail,upassword);

            it("Test creation of a valid user with matching parameters",function(){
                assert.strictEqual(user.name,'Mark Brown');
                assert.strictEqual(user.email,"mark00@gmail.com");
                assert.strictEqual(user.password,"mark1234");
            });

            it('test if user is invalid function(Invalid Name)', async function(){

                let u = new User('Mark Brown2',uemail,upassword);
                assert.strictEqual(await validation.validateDetails(u.name,u.email),false);
            });


            it('test if user is invalid functio(Invalid EMail)',async function(){

                let u = new User(uname,"mark011@gmail.com",upassword);
                assert.strictEqual(await validation.validateDetails(u.name,u.email),false);

            });
            it("Test if user is invalid function(Invalid Password",async function(){
                let u = new User(uname,uemail,"2mark11@");
                assert.strictEqual(await validation.validateDetails(u.name,u.email),false);
            });
        });

    });
});


describe("Test API calls",function(){
    describe('Contacts',async function(){
        it("Fail 1. POST - Test invalid email in object",async function(){
            let data = {
                name:'14jtu@aa',
                email:'mark00wjdmail.com',
                password:'mark1234'
            }
            let res = await instance.post('/user',data);
            assert.strictEqual(res.data,'Error. User not inserted in the database');

        });

        it("Fail 2.POST - Test invalid email in the object ",async function(){


            let data = {
                name:'Mark Brown',
                email:'Mark12x@gm.pp',
                password:'mark1234'
            };

            let res = await instance.post('/user',data)
            assert.strictEqual(res.data,'Error. User not inserted in the database');
        });

        it("Fail 3.POST - Test invalid password in the object",async function(){

            let data = {

                name:'Mark Brown',
                email:"mark00@gmail.com",
                password:"@12ss"
            };


            let res = await instance.post('/user',data)
            assert.strictEqual(res.data,'Error. User not in the database');

        });

        it("Fail 4. GET - /user/:name(No user with name)",async function(){

            let user_name="Someone Unknown";
            let res = await instance.get('/user'+user_name);
            assert.strictEqual(res.data,'No item was found');
        })

        it('Fail 5. DELETE -/contacts/:name(No user with name',async function(){
            let user_name = 'SOmeone Unknown';
            let res = await instance.delete('/user'+user_name);
            assert.strictEqual(res.data,'COntact as not found');
        });
        it('Fail 6. PUT - /user/:name (No user with name)', async function(){
            let data = { 
                name: 'Someone Unknown', 
                email: 'mark00@gmail.com', 
                password:'mark1234'
        };
        let res = await instance.put('/user'+data.name,data);
        assert.strictEqual(res.data,'The new user data is not valid');

        });
        it('Success 1. POST - Valid User, DELETE - User', async function(){
            let data = {
                name: 'John Smith', 
                email: 'jsmith@mun.ca', 
                password:'john1234'
            }
            let res_post = await instance.post('/user', data)
            assert.strictEqual(res_post.data, 'User correctly inserted in the Database.');
            let res_del = await instance.delete('/user/'+data.name);
            assert.strictEqual(res_del.data, 'User was deleted.');                
        });
        it('Success 2. POST - Valid User, GET - /user (Greater 0), DELETE - User', async function(){
            let data = { 
                name: 'Mark Taylor', 
                email: 'markt009@gmail.com', 
                password:'mark001'
            };
            let res_post = await instance.post('/user', data)
            let res_get = await instance.get('/user')
            if (res_get.data.length < 1 ) {
                assert.fail('There should be elements in the database');
            }
            let res_del = await instance.delete('/user/'+data.name);
            assert.strictEqual(res_del.data, 'User was deleted.');                
        });
        it('Success 3. POST - Valid User, GET - :name, DELETE - User', async function(){
            let data = {
                name: 'Bob Churchil', 
                email: 'bchurchil@mun.ca', 
                password:'bob009'
            };
            let res_post = await instance.post('/user', data)
            let res_get = await instance.get('/user/'+data.name)
            assert.strictEqual(res_get.data.name, data.name);
            assert.strictEqual(res_get.data.email, data.email);
            assert.strictEqual(res_get.data.password,data.password);
            let res_del = await instance.delete('/user/'+data.name);
            assert.strictEqual(res_del.data, 'Contact was deleted.');                
        });
        it('Success 4. POST - Valid User, UPDATE - :name, GET - /:name, DELETE - User', async function(){
            let data = {
                name: 'Robert Doe', 
                email: 'rob@mun.ca', 
                password:'robert0123'
            };
            let up_data = {
                name: 'Robert Doe Jr', 
                email: 'robs@mun.ca', 
                password:'robert01239'
            };
            let res_post = await instance.post('/user', data)
            let res_put = await instance.put('/user/'+data.name, up_data);
            assert.strictEqual(res_put.data,'User correctly updated.');
            let res_get = await instance.get('/user/'+up_data.name)
            assert.strictEqual(res_get.data.name, up_data.name);
            assert.strictEqual(res_get.data.email, up_data.email);
            assert.strictEqual(res_get.data.password,data.password);
            
            let res_del = await instance.delete('/user/'+up_data.name);
            assert.strictEqual(res_del.data, 'user was deleted.');                
        });            








    })
})
