var express     = require("express"),
    MongoClient = require("mongodb").MongoClient,
    mongolist   = require("my-mongo-list"),
    bodyParser  = require("body-parser");

function buildApp(config, done) {
    var app = express(),
        lists,
        elements;

    app.use(bodyParser());
    app.use(function (req, res, next) {
        elements = req.body;
        next();
    });

    app.post("/lists", function (err, res) {

        lists.save(elements, function (err, data) {
            res.send(data);
        });
    });

    MongoClient.connect(config.url, function (err, db) {
        lists = mongolist(db);

        done(null, app);
    });

}

module.exports = buildApp;


if (require.main === module) {
    console.log("we are the main module!");
    buildApp({url: "mongodb://localhost/test"}, function (err, app) {
        app.listen(3000);
    });
}
