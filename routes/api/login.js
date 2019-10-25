const auth = require('../../models/auth.js');

module.exports = (app) => {
    app.post("/login", async function (req, res, next) {
        auth.bcryptPasswordCompare(req.body, res)
           
        

    });

};