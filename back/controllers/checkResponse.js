exports.checkResponse = async (req, res) => {

    
    const { id } = req.params.id
    const solus = req.body
    console.log(id);
    console.log(solus);
    const en = await db.query(`select * from engime where id_enigme = ${id}`)
    const so = await db.query(`select * from enigme where en.solus = en.solus`)

    if (solus) {
        solus === so.solus
    }
    
   
}

// const response = await db.query(`INSERT INTO enigme_response SET id_enigme=:id_enigme, id_user="${req.session.user.id}=:id_user="${req.session.user.id}"`, {id_enigme, id_user});

// const dbEnigmes = await db.query(`SELECT * FROM enigme`)
// const dbEnigmesReponse = await db.query(`SELECT * FROM enigme_reponse`)