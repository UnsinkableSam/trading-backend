"use strict";
const mongo = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dsn = "mongodb://localhost:27017/members";
// const colName = "chat";
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

module.exports = {



    addOne: async function (doc, colName) {
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
                col.insertOne(doc);
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
        console.log(doc);
        let stocksArray = [];
        
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection(colName);
        const member = await col.find({ "_id": ObjectID(doc.id) }).toArray();
        if (!member[0].stocks) {
            await col.updateOne(
                { "_id": ObjectID(doc.id) },
                { $set: { stocks: [{ "name": doc.stock, "amount": doc.amount, "cost": doc.cost }] } }
            )
        } else {
            
            
            member[0].stocks.map((stock) => {
                if (Number.isNaN(stock.amount) ) {
                    stock.amount = 0;
               }
                
                if (stock.name == doc.stock) {  
                    if (doc.amount > 0) {
                        return stock.amount = parseInt(stock.amount) + parseInt(doc.amount);
                    }
                    
                    if (doc.sell > 0) {
                        console.log("heyja");
                        console.log(parseInt(stock.amount) - parseInt(doc.sell));
                        condition = false;
                        return stock.amount = parseInt(stock.amount) - parseInt(doc.sell);
                    } else {
                        condition = true;
                    }
                } 
            })
          
        
    
            
        }
        
        
        console.log("asdadads");

    },


////
    /// Update 
    updateStock: async function (doc, column) {

    },
    

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