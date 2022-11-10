/* ERROR 404 */
const
page404 = async (req, res) =>{
    res.render('page404', {
    });
}

module.exports = { page404 }