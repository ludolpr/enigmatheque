const flash = require("flash");

exports.checkReponse = async (req, res) => {
    
    console.log("params:",req.params);

    const { id } = req.params
    const {solus} = req.body
    
    console.log("id:",id);
    console.log("solus:",solus);

    const [en] = await db.query(`select * from engime where id_enigme =${id}`)
    
    if (solus) {
        if (en.solus.toLowerCase() === solus.toLowerCase()) res.render("back", { flash: "Réponse exacte" });
        else res.render("", { flash: "Mauvaise réponse" });
    } else res.render("", { flash: "Il manque une réponse" })
    
   
}

