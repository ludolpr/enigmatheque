const
// ----------------------------------------------------------------------- //
// ---------------------CRUD MESSAGE A L'ADMIN---------------------------- //
// ----------------------------------------------------------------------- //

// CREATE IN FORM
  message = async (req, res) => {
    console.log("message envoyé", req.body);
    const { name, email, sujet, message } = req.body;
    await db.query(
      `INSERT INTO message (name, email, sujet, message ) VALUES ("${name}","${email}", "${sujet}", "${message}");`
    );

    // await db.query(
    //   `INSERT INTO message (name, email, sujet, message ) VALUES ("${name}","${email}", "${sujet}", "${message}" WHERE id=${id};`)

    res.redirect("/");
  },

  messageId = async (req, res) => {
    res.render("enigme_details", {});
  },

  // DELETE MESSAGE
  deleteMessage =  async (req, res) => {
    console.log("delete::message", req.params);
    const { id } = req.params;

    if (id) await db.query(`DELETE FROM message WHERE id = "${id}";`);

    res.redirect("/admin");
  };
// ----------------------------------------------------------------------- //
// -----------------------------EXPORTS MODULE---------------------------- //
// ----------------------------------------------------------------------- //
  module.exports = { message, messageId, deleteMessage}