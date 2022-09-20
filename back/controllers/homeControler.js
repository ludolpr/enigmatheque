const 
getPageHome = async  (req, res) => {
  const dbEnigmes = await db.query(`SELECT * FROM enigme`);
    res.render("home",{
      enigmes: dbEnigmes
    })
    
  };
  

  module.exports = { getPageHome }

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