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
  // path 
  path = require('path'),
  // deprecation const for use
  process = require('process'),
  { MAIL_USER, DB_PASSWORD } = process.env;

chai.use(chaiHttp);


// description du tets
describe("Enigme test, chai !", () => {
  // definition des vazriables à utiliser
  console.log("1");
  let newEnigme;
  let cookieSession = "";

  // test Route Post Login
  it("LOGIN", (done) => {
    chai
      .request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send({ email: MAIL_USER, password: DB_PASSWORD })
      .end((err, res) => {
        console.log("res POST => Login => enigmes", res.body);
        if (err) return done(err);
        cookieSession = res.res.headers["set-cookie"][0].split(";")[0]

        res.should.have.status(200);
        done();
      });
  });

  // test de la route Post Enigmes
  it("GET CATEGORIES 1", (done) => {
    // appel de chai avec .request(app)
    console.log("2");

    chai
      .request(app)
      // route choisi
      .get("/enigme")
      // format de la réponse
      .set("Accept", "application/json")
      .set("Cookie", cookieSession)
      .end((err, res) => {
        if (err) return done(err);
        console.log("res GET enigmes", res.body);

        // on lui dit que ça doit etre un array
        res.body.enigmes.should.be.a("array")
        // cloture du test
        done();
      });
  });

  // test de mon POST Enigme
  it("POST", (done) => {
    chai
      .request(app)
      .post("/insertEnigme")
      .set("Accept", "application/json")
      .set("Cookie", cookieSession)
      .send({
        titre: "montitre",
        difficulty: 1,
        content: "ah ok",
        solus: "lol"
      })
      .end((err, res) => {
        // console.log("test res newEnigme", res.body);
        if (err) return done(err);
        res.body.flash.should.be.a("string");
        res.body.newEnigme.should.be.a("object");
        res.body.dbEnigmes.should.be.a("array");
        res.should.have.status(200);
        newEnigme = res.body.newEnigme
        done();
      });
    // console.log("test n°10499")
  });


  it("GET ID ", (done) => {
    // appel de chai avec .request(app)
    chai
      .request(app)
      .get(`/enigme/${newEnigme.id_enigme}`)
      .set("Accept", "application/json")
      .set("Cookie", cookieSession)
      // route choisi
      // format de la réponse
      .end((err, res) => {
        if (err) return done(err);
        // console.log("res GET enigmes", res.body);

        // on lui dit que ça doit etre un array
        res.body.enigme.should.be.a("object")
        // cloture du test
        done();
      });
  });

  // Test de mon PUT Enigme
  it("PUT", (done) => {
    chai
      // import express (appli , route , ect)
      .request(app)
      // methode utilisé (PUT,POST,GET,DELETE) et route (/exemple)
      .put(`/updateEnigme/${newEnigme.id_enigme}`)
      // transforme en json OK
      .set("Accept", "application/json")
      // session user/admin
      .set("Cookie", cookieSession)
      // données modifier
      .send({
        titre: "titremon",
        difficulty: 2,
        content: "ok ah",
        solus: "lolipop"
      })
      // ci dessous .attach permet de tester les images, __dirname & le chemin du fichier
      //   .attach("avatar", path.resolve(__dirname, "../public/images"))

      // pour finir il envoie la réponse 
      .end((err, res) => {
        console.log("test n°11578")
        if (err) return done(err);
        res.body.flash.should.be.a("string");
        res.body.putEnigme.should.be.a("object");
        res.body.dbEnigmes.should.be.a("array");
        res.should.have.status(200);
        putEnigme = res.body.putEnigme
        done();
      });
  });

  // Test de mon DELETE Enigme
  it(" chai // DELETE // id_enigme ID", (done) => {
    chai
      .request(app)
      .delete(`/enigme/${newEnigme.id_enigme}`)
      .set("Accept", "application/json")
      .set("Cookie", cookieSession)
      .end((err, res) => {
        if (err) return done(err);
        console.log("res DELETE => enigme", res.body);

        res.should.have.status(200);
        done();
      });
  });
});

// res.body. "ce que tu viens chercher exempple un ID".should.be


// GET / GET ID / POST / PUT / DELETE / LOGIN