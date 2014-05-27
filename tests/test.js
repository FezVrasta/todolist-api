/* globals describe, beforeEach, afterEach, it */

var clean       = require("mongo-clean"),
    assert      = require("assert"),
    //async       = require("async"),
    appBuilder  = require("../"),
    mongolist  = require("my-mongo-list"),
    request     = require("supertest");

var url = "mongodb://localhost/test";

describe("todolist-api", function () {
    var db,
        lists,
        app;

    beforeEach(function (done) {
        clean(url, function (err, created) {
            db = created;
            lists = mongolist(created);
            appBuilder({ url: url }, function (err, created) {
                app = created;
                done(err);
            });
        });
    });

    afterEach(function () {
        db.close();
    });

    it("should create a list", function (done) {

        request(app)
        .post("/lists")
        .send({name: "foobar"})
        .end(function () {
            lists.load(function (err, loaded) {
                console.log(loaded);
                assert.equal(loaded.length, 1);
                done(err);
            });
        });
    });


});
