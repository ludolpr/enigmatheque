exports.isAdmin = async (req, res, next) => {
  // if (!req.session.user) return res.redirect('/')
  // const [user] = await db.query(`SELECT isAdmin FROM membres WHERE email="${req.session.user.email}"`);
  // console.log("isAdmin", user);
  // (user.isAdmin === req.session.user.isAdmin && user.isAdmin === 0) ? res.redirect('/') : next();
  next()
} 

//   const isAdmin = async (req, res, next) => {
//     if(!req.session.membres) return res.redirect('/')
//     const [user] = await db.query(`SELECT isAdmin FROM membres WHERE email="${req.session.user.email}"`);
//     console.log("isAdmin", user);
//     ( user.isAdmin === req.session.user.isAdmin && user.isAdmin === 0 ) ? res.redirect('/') : next();
//   }


// module.exports = { isAdmin }