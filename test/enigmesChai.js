// const { application } = require("express");
// const { disconnect } = require("process");
// const getEnigmes = require("../test/enigmesChai")
require("dotenv").config();

const chaiHttp = require("chai-http"),
    // import de db et app
    { app } = require("../server"),
    // chai
    chai = require("chai"),
    // chai.should
    should = chai.should(),
    // chai expect
    expect = chai.expect,
    //   process = require('process'),
    { MAIL_USER, DB_PASSWORD } = process.env
    path = require('path');

chai.use(chaiHttp);

// description du tets
describe("Enigme test, chai !", () => {
    // definition des vazriables à utiliser
    let id;
    let cookieSession = "";

    // test de la route Post Enigmes
    it("getEnigmes // Get // Enigmes", (done) => {
        // appel de chai avec .request(app)
        chai
            .request(app)
            // route choisi
            .get("/enigme?q=facile")
            // format de la réponse
            .end((err, res) => {
                if (err) return done(err);
                console.log("res get enigmes", res.body);

                // on lui dit que ça doit etre un array
                res.body.enigmes.should.be.a("array")
                // cloture du test
                done();
            });
    });

      // test Route Post Login
      it("chai // POST // Login", (done) => {
        chai
          .request(app)
          .post("/login")
          .set("Accept", "application/json")
          .send({ email: MAIL_USER, password: DB_PASSWORD })
          .end((err, res) => {
            cookieSession = res.res.headers["set-cookie"][0].split(";")[0];
            if (err) return disconnect(err);
            console.log("res post enigmes", res.body);

            res.should.have.status(200);
            done();
          });
      });

      // test de mon POST Enigme
      it("chai // POST // enigme", (done) => {
        chai
          .request(app)
          .get(`/enigme/${id}`)
          .set("Accept", "application/json")
          .set("Cookie", cookieSession)
          .field("difficulty", "1")
          .field("titre", "montitre")
          .field("content", "ah ok")
          .field("solus", "lol")
          .end((err, res) => {
            if (err) return done(err);
            res.body.id.should.be.a("number");
            id = res.body.id
            res.should.have.status(200);
            done();
        });
        
        
      });

      // // Test de mon PUT Enigme
      it(" chai // PUT // id_enigme", (done) => {
        chai
          .request(app)
          .put(`/enigme/${id}`)
          .set("Accept", "application/json")
          .set("Cookie", cookieSession)
          .field("difficulty", "1")
          .field("titre", "titremon")
          .field("content", "ok ah")
          .field("solus", "lolipop")
        //   .attach("avatar", path.resolve(__dirname, "../public/images"))
          .end((err, res) => {
            if (err) return done(err);
            console.log("res put enigmes", res.body);

            res.should.have.status(200);
            done();
          });
      });

      // // Test de mon DELETE Enigme
      it(" chai // DELETE // id_enigme ID", (done) => {
        chai
          .request(app)
          .delete(`/enigme/${id}`)
          .set("Accept", "application/json")
          .set("Cookie", cookieSession)
          .end((err, res) => {
            if (err) return done(err);
            console.log("res delete enigmes", res.body);

            res.should.have.status(200);
            done();
          });
      });
      // bas du descripbe
});

// res.body. "ce que tu viens chercher exempple un ID".should.be
