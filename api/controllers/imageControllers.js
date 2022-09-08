// Dans mon controlleur
// MAJ du profil
exports.controllerImage = async (req, res) => {
    const { avatar, id } = req.body;
    const image = req.file ? req.file.filename : false;
    console.log("image", req.file);
    if (image) await db.query(`INSERT INTO membres SET avatar="${avatar}", id="${req.session.user.id}" , image="${image}"`),
    console.log("image OK");
  else await db.query(`INSERT INTO membres SET avatar="${avatar}", id="${req.session.user.id}" , image="{{profil.avatar}}"`), 
  console.log("image NOK");
  
  console.log("envoi du controller OK");
  res.redirect("back");
  } 
  // NE SERF A RIEN !!