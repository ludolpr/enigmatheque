module.exports = {
  isAdmin: async (req, res, next) => {
    if(!req.session.user) return res.redirect('/')
    const [user] = await db.query(`SELECT isAdmin FROM membres WHERE id="${req.session.user.id}"`);
    // console.log(user);
    ( user.isAdmin === req.session.user.isAdmin && user.isAdmin === 0 ) ? res.redirect('/') : next();
   }
}