// Import module
const assert = require("assert");
const mysql = require("mysql");

// Import config DB
const configDB = require("../api/config/config_db");
// Création de la connection avec les paramètres donner
db = mysql.createConnection(configDB);
// Config ASYNC
const util = require("util");
db.query = util.promisify(db.query).bind(db);

describe("Début des tests", function () {
  it("Test connexion DB", function () {
    // Connexion de la db mysql
    db.connect((err) => {
      if (err) console.error("error connecting: ", err.stack);
      // console.log('connected as id ', db.threadId);
      assert.equal(typeof 0, typeof db.threadId);
    });
  });

  describe("test enigmes", function () {
    let enigmes = {};

    beforeEach(async () => {
      // console.log("beforeEach");
      let art = await db.query(
        `INSERT INTO enigme (titre, difficulty, content, solus, id_user) VALUES ("TITRE1", 1, "oops", "cool", 1);`
      );
      let res = await db.query(
        `SELECT * FROM enigme WHERE id_enigme = "${art.insertId}";`
      );
      // console.log("art", art, res[0]);
      enigmes = res[0];
    });

    // effacer les enigmes apres chaque test
    afterEach(async () => {
      // console.log("after each", enigmes);
      await db.query(
        `DELETE FROM enigme WHERE id_enigme = "${enigmes.id_enigme}";`
      );
    });

    // get
    it("Test Async getEnigmes", async () => {
      // console.log("it");
      let res = await db.query(`Select * from enigme;`);
      assert.strictEqual(typeof res, typeof []);
    });

    // Get ID
    it("Test Async getEnigmes ID", async () => {
      // console.log("getEnigmes ID");
      let res = await db.query(
        `SELECT * FROM enigme WHERE id_enigme = "${enigmes.id_enigme}";`
      );
      assert.strictEqual(typeof res, typeof []);
    });

    // put
    it("Test Async putEnigmes", async () => {
      // console.log("put", enigmes);
      let data = await db.query(`UPDATE enigme SET titre="bijour" WHERE id_enigme = "${enigmes.id_enigme}";`)
      // console.log("update de mes datas", typeof data);
      assert.equal(typeof data, typeof {});
    });

    // delete
    it("delEnigmes", async () => {
      let data = await db.query(`DELETE FROM enigme WHERE id_enigme = "${enigmes.id_enigme}";`)

      console.log("voici mes datas", data);
      assert.equal(typeof data, typeof {});
    });



    // ------------------------------------------------------------------------------------ //
    // --------------------------------SEPARATE-------------------------------------------- //
    // ------------------------------------------------------------------------------------ //

    // ci dessous éffacer toute les énigmes ou autres

    // it("Delete All", async function () {
    //   await db.query(`DELETE from enigme WHERE titre="TITRE1"`);
    //   let all = await db.query(`SELECT * from enigme`);
    //   // console.log('all', all)
    //   assert(all.length < 1);
    // });
  });
});
