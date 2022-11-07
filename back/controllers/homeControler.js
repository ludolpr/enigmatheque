const getPageHome = async (req, res) => {
  const dbEnigmes = await db.query(
    // ORDER BY id_enigme DESC LIMIT 3 => me prend les trois derniere enigme poster pour les afficher
    `SELECT * FROM enigme WHERE is_Verified=1 ORDER BY id_enigme DESC LIMIT 3`
  );
  res.render("home", {
    enigmes: dbEnigmes,
  });
};

module.exports = { getPageHome };

//   const
// getPageHome = async  (req, res) => {
//   const { id } = req.params;
//   const dbEnigmes = await db.query(`select * from enigme WHERE id_enigme = "${id}";`);
//     res.render("home",{
//       enigmes: dbEnigmes
//     })
//     console.log(req.params);
//   };

//   module.exports = { getPageHome }
