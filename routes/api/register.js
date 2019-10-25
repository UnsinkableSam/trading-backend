const mongo = require('../../models/mongo.js');

module.exports = (app) => {
    app.post("/register", async function (req, res, next) {
        
        await mongo.addOne(req.body, "members", res);
        // return res.status(200);
        

    });



    app.post("/getMember", async function (req, res, next) {
        const data = mongo.getMember(req.body, "members");
        return res.json(await data);


    });

};