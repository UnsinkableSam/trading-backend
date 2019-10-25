const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const stock = require("./models/stock.js");
const mongo = require('./models/mongo.js');


const app = express();
const port = 8333;

var princessTarta = {
    name: "Princesstårta",
    rate: 1.002,
    variance: 0.6,
    startingPoint: 20,
};

var mandelKubb = {
    name: "Mandel kubb",
    rate: 1.001,
    variance: 0.4,
    startingPoint: 20,
    time: 0
};

// var stockdata = { name: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(), "startingPoint": 1 };
var cakes = [princessTarta, mandelKubb];
mongo.addCollection(cakes, "stocks");
// var cakes = [stockdata];
app.use(cors());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//routes
require('./routes')(app);

if (process.env.NODE_ENV !== "test") {

    app.use(morgan("combined"));
}


// Start up server

const server = app.listen(port, () => console.log(`Example API listening on port ${port}!`));
// const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.origins(['localhost:3000']);
app.all('/**', (req, res, next) => {
    return res.status(404).json(`Sorry can't find route ${req.url}!`)
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

setInterval(function () {
    cakes.map((cake) => {
        var today = new Date();
        cake["startingPoint"] = stock.getStockPrice(cake);
        cake["time"] = today.getHours() + ":" + today.getMinutes();
        return cake;
    });

    // console.log(cakes);

    io.emit("stocks", cakes);
}, 5000);





module.exports = server;