const mongo = require("mongodb").MongoClient;
const dsn = "mongodb://localhost:27017/members";



module.exports = {



    addCollection: async function (doc, colName) {
        console.log(doc);
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection(colName);

        await col.deleteMany();
        await col.insertMany(doc);

        await client.close();
    },










    getAll: async function (doc, colName) {
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection(colName);
        if (!client) {
            return "no client";
        }
        try {
            const db = client.db("testdb");
            console.log(await col.find().toArray());
            return await col.find().toArray();
        } catch (err) {
            console.log(err);
        } finally {
            client.close();
        }
    },







}