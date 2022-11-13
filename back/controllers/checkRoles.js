exports.checkRoles =  async {
    const { id } = req.params;
    const {isAdmin, isBan} = req.body
    let [dbMembres] =  await db.query(`SELECT isAdmin,isBan FROM membres WHERE id=${id}`)
    (dbMembres.isAdmin === "1" &&  )
    if (vrf3{{ this.id }}.toString() === "1" ) is_Admin{{ this.id }}.checked = true;
    user.isAdmin === req.session.user.isAdmin && user.isAdmin === 0 ) ? res.redirect('/') : next();
}