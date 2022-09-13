/* ERROR 404 */
// A Mettre a la fin ( a bouger dans router)
const
page404 = async (req, res) =>{
    res.render('page404', {
    });
}

module.exports = { page404 }