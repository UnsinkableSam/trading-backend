const mongo = require('../../models/mongo.js');

module.exports = (app) => {
    app.post("/payAdd", async function (req, res, next) {
        // mongo.addOne(req.body, "members");
        
        mongo.paymentAdd(req.body, "members", "money");

    });




    app.post("/money", async function (req, res, next) {

        const money = await mongo.getMemberMoney(req.body.id, "members");
        
        return res.json(await money);

    });

};