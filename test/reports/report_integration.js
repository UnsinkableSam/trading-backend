process.env.NODE_ENV = 'test';
const mongo = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dsn = "mongodb://127.0.0.1:27017/test";
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');
let userId = "";
chai.should();

chai.use(chaiHttp);

const dbDrop = async ()  => {
    const client = await mongo.connect(dsn);
    const db = await client.db();
    
    // const col = await db.collection.drop("members");
    // await db.collection("members").drop();
    // await col.drop();
}

describe('Reports', () => {
    dbDrop();
    describe('Post/stocks', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/stocks")
                .end((err, res) => {
                    
                    res.should.have.status(200);
                    res.body.should.be.an("array");
                    res.body.length.should.be.above(0);

                    done();
                });
        });
    });



   /// TEST DB I WORKING SO WONT WORK UNTIL REGISTERED PERSON!

    describe("post /register", () => {
        it("200 /register", (done) => {
            chai.request(server)
                .post("/register")
                .send({
                    password: '123',
                    login: 'test',
                    email: 'test@tt.se',
                    stocks: []
                })
                
                .end((err, res) => {
                    console.log(res.body);
                    userId = res.body.id;
                    res.should.have.status(200);
                    // res.body.should.be.an("object");
                    // res.body.data.should.be.an("array");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe("post /getMember", () => {
        it("200 /getMember", (done) => {
            chai.request(server)
                .post("/getMember")
                .send({
                    id: userId,
                    password: '123',
                    login: 'test',
                    email: 'test@tt.se',
                    stocks: []
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    // res.body.should.be.an("object");
                    res.body.should.be.an("array");
                    res.body.length.should.be.above(0);

                    done();
                });
        });
    });

    describe("post /stock", () => {
        it("200 /stock", (done) => {
            chai.request(server)
                .post("/stock")
                .send({
                    id: userId,
                    stock: 'Mandel kubb',
                    cost: 25,
                    amount: '1',
                    sell: ''
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    // res.body.should.be.an("object");
                    // res.body.should.be.an("array");
                    // res.body.length.should.be.above(0);

                    done();
                });
        });
    });


    describe("post /sell", () => {
        it("200 /sell", (done) => {
            chai.request(server)
                .post("/sell")
                .send({
                    id: userId,
                    stock: 'Mandel kubb',
                    cost: 25,
                    amount: '',
                    sell: '1'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    // res.body.should.be.an("object");
                    // res.body.should.be.an("array");
                    // res.body.length.should.be.above(0);

                    done();
                });
        });
    });



    describe("post /login", () => {
        it("200 /login", (done) => {
            chai.request(server)
                .post("/login")
                .send({
                    id: userId,
                    password: '123',
                    login: 'test',
                    email: 'test@tt.se',
                    stocks: []
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    // res.body.should.be.an("object");
                    // res.body.should.be.an("array");
                    // res.body.length.should.be.above(0);

                    done();
                });
        });
    });
});
