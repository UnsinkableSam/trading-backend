"use strict";
const mongo = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
let dsn = "mongodb://localhost:27017/members";
if (process.env.NODE_ENV === 'test') {
    dsn = "mongodb://localhost:27017/test";
    console.log("TEST DB");
}

// const colName = "chat";
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

module.exports = {



    addOne: async function (doc, colName, res) {
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection(colName);

        bcrypt.hash(doc.password, saltRounds, function (err, hash) {
            if(err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/register",
                        title: "bcrypt error",
                        detail: "bcrypt error"
                    }
                });
            }
            try {
                doc.password = hash;
                console.log(doc.password);
                col.insertOne(doc).then((result) => {
                    return res.status(200).json({
                        "msg": "success",
                       "id": result.insertedId
                    });
                })
                
            } catch (e) {
                console.log(e);
            } finally {
                client.close();
            }
        });

        
       
    
    
    },

    addCollection: async function (doc, colName) {
        console.log(doc);
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection(colName);

        await col.deleteMany();
        await col.insertMany(doc);

        await client.close();
    },


    paymentAdd: async function (doc, colName, name) {
        
        
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection(colName);
        const money = await col.find({ "_id": ObjectID(doc.id) }).toArray();
        
       
        if (!(money[0].money)) {
            
            money[0].money = 0;
        }
        
        await col.updateOne(
            { "_id": ObjectID(doc.id) },
            { $set: { money: parseInt(money[0].money + doc.money) } }
        )

        await client.close();
    },

    paymentSell: async function (doc, colName, name) {
        

        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection(colName);
        const money = await col.find({ "_id": ObjectID(doc.id) }).toArray();

        
        await col.updateOne(
            { "_id": ObjectID(doc.id) },
            { $set: { money: parseInt(money[0].money + doc.money) } }
        )

        await client.close();
    },




////
    stockAdd: async function (doc, colName, name) {
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection(colName);
        const member = await col.find({ "_id": ObjectID(doc.id) }).toArray();
        let condition = false;
        console.log("Working?"); 
        
        
        var found = member[0].stocks.find(function (stock) {
            console.log("lol");
            return (stock.name == doc.stock);
        });

        
        if (!found) {
            // If no stocks. 
            // Push new to stock array.
            console.log("updating array");
            member[0].stocks.push({ "name": doc.stock, "amount": doc.amount, "cost": doc.cost });
            
        } 
        else {
            member[0].stocks.map(stock => {
                // If stock found add amount.
                if (stock.name == doc.stock && doc.amount > 0 ) {
                    
                    return stock.amount = parseInt(stock.amount) + parseInt(doc.amount);
                }
                else if (stock.name == doc.stock && doc.sell > 0) {
                    
                    return stock.amount = parseInt(stock.amount) - parseInt(doc.sell);
                } 
                    
            });

        
            
        } 

       
       
        // Updating the stock with new array of stocks.
        await col.updateOne(
            { "_id": ObjectID(doc.id) },
            { $set: { stocks: member[0].stocks } }
        )

    },


////
    

    getAll: async function (doc, colName) {
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection(colName);
        if (!client) {
            return "no client";
        }
        try {
            const db = client.db();
            
            return await col.find().toArray();
        } catch (err) {
            console.log(err);
        } finally {
            client.close();
        }
    },


    getMember: async function (doc, colName) {
        
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection(colName);
        if (!client) {
            return "no client";
        }
        try {
            const db = client.db();
            return await col.find({ "_id": ObjectID(doc.id) }).toArray();
        } catch (err) {
            console.log(err);
        } finally {
            client.close();
        }
    },


    getMemberByLogin: async function (doc, colName) {
        console.log(typeof doc);
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection(colName);
        if (!client) {
            return "no client";
        }
        try {
            const db = client.db();
            return await col.find({ "login": doc }).toArray();
        } catch (err) {
            console.log(err);
        } finally {
            client.close();
        }
    },



    getMemberMoney: async function (doc, colName) {
        
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection(colName);
        if (!client) {
            return "no client";
        }
        try {
            const db = client.db("testdb");
            return await col.find({ "_id": ObjectID(doc) }).toArray();
        } catch (err) {
            console.log(err);
        } finally {
            client.close();
        }
    }


}