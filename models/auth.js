"use strict";
const jwt = require('jsonwebtoken');
const mongo = require('./mongo.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
// const colName = "chat";

const jwtSecret = process.env.JWT_SECRET || "123";

module.exports = {



    bcryptPasswordCompare: async function (doc, response) {
        console.log("hello mannen");
        console.log(doc);
        let member = await mongo.getMemberByLogin(doc.login, "members");
        console.log("we want it all");
        console.log(member[0].password);
        console.log(member[0]);
        console.log(doc.password);
        bcrypt.compare(doc.password, member[0].password, async function (err, res) {
            if (err) {
                return response.status(500).json({
                    errors: {
                        status: 500,
                        source: "/login",
                        title: "bcrypt error",
                        detail: "bcrypt error"
                    }
                });
            }
                let payload = { email: doc.email };
                let jwtToken = jwt.sign(payload, jwtSecret, { expiresIn: '24h' });
                console.log("true");
            if(res) {
                return response.status(200).json({
                    data: {
                        type: "success",
                        message: "User logged in",
                        user: payload,
                        token: jwtToken,
                        id: member[0]._id
                    }
                });
            }
            
        });
    },




}