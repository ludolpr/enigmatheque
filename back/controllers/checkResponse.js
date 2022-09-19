checkResponse = async (req, res) => {
    console.log("checkResponse", req.body);
    const enigmeList = await db.query(`select * from engime`)
    
    const response = await db.query(`INSERT INTO enigme_response SET id_enigme=:id_enigme, id_user="${req.session.user.id}=:id_user="${req.session.user.id}"`, {id_enigme, id_user});
   
}
checkResponse()
