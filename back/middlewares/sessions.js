module.exports = {
  isSession: async (req, res, next) => {
    if (!req.session.user) return res.redirect("back");
    next();
  },
};
