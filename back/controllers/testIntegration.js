require("dotenv").config()


exports.getEnigmes = async (req,res) => {
    const dbEnigmes = await db.query(`SELECT * FROM enigme WHERE id_enigme = "${enigme.id_enigme}";`)
    if(process.env.MODE === "test"){
        res.json({dbEnigmes})
    }else {
        res.render("/enigmes", {dbEnigmes})
    }
}
