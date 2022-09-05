describe("test de la base de données", function () {
    describe("test database", function () {
      let id, enigmes;
  
      beforeEach(async () => {
        const enigmeId = db.query(
          `insert into enigme ('id_enigme','titre','difficulty','content','solus','is_Verified','id_user') VALUES ("le verre d'eau",1,"Combien peut t'on mettre de gouttes d'eau dans un verre vide ?",'1',1,0)`
        );
  
        id = enigmeId.insertId;
        console.log("voici l'id de insertId", insertId);
        enigmeId = await db.query(`select * from enigme where id=${id}`);
        = await db.query(`select * from enigme where id=${id}`);
      });
      it("getArticles", async () => {
        const dbArticles = await db.query(`select * from enigme`);
        assert.equal(dbArticles, []);
      });
  
      it("Test connexion DB", function () {
        // connexion de la base de données
        db.connect((err) => {
          if (err) console.error("erreur de connexion: ", err.stack);
          // console.log(' conncté comme ID' , db.threadId);
  
          assert.equal(typeof 0, typeof db.threadId);
        });
      });
  
      it("Test Sync", function () {
        db.query("Select * from articles", (err, data) => {
          if (err) return console.log(err);
          // console.log(data)
  
          assert.equal(typeof data, typeof []);
        });
      });
  
      it("Test Sync deux", async function () {
        const data = await db.query("Select * from articles");
        // console.log(data);
  
        assert.equal(typeof data, typeof []);
      });
    });
  });
  