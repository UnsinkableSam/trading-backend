const mongo = require('../../models/mongo.js');

module.exports = (app) => {
    app.post("/stock", async function (req, res, next) {
        // mongo.addOne(req.body, "members");

        
        let money = (req.body.amount * req.body.cost);
        req.body.money = parseInt("-" + money); 
        // req.body.money = money - (req.body.amount * req.body.cost)
        
        mongo.paymentAdd(req.body, "members", "money");
        mongo.stockAdd(req.body, "members", req.body.stock)
        .then(() => {
            return res.status(200).json({ msg: "success" });
        })
    });


    app.post("/sell", async function (req, res, next) {
        
      

        req.body.money = (req.body.sell * req.body.cost);
        // req.body.money = money - (req.body.amount * req.body.cost)
        req.body.amount = null;
        
        mongo.paymentSell(req.body, "members", "money");
        mongo.stockAdd(req.body, "members", req.body.stock)
            .then(() => {
                return res.status(200).json({ msg: "success" });
            })

    });


    app.post("/stocks", async function (req, res, next) {
        // mongo.addOne(req.body, "members");
       
        const data = await mongo.getAll("stocks", "stocks");
        return res.status(200).json(await data);

    });

};


