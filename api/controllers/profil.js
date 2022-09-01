// Dans mon controlleur
// MAJ du profil
exports.profil = async (req, res) => {
    const { profil, id } = req.body;
    const image = req.file ? req.file.filename : false;
    // console.log("image", req.file);
    if (image) await db.query(`INSERT INTO membres SET profil="${profil}", id_user="${req.session.user.id}" , image="${image}"`),
    console.log("image OK");
  else await db.query(`INSERT INTO membres SET profil="${profil}", id_user="${req.session.user.id}" , image=''`), 
  console.log("image NOK");
  
  console.log("envoi du controller OK");
  res.redirect("back");
  }