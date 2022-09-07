require("dotenv").config();

exports.getEnigmes = async (req, res) => {
  console.log("Get Enigmes");

  let dif;
  switch (req.query.q) {
    case "facile":
      dif = 1;
      break;
    case "normal":
      dif = 2;
      break;
    case "difficile":
      dif = 3;
      break;
    case "devinettes":
      dif = 4;
      break;
    case "sage":
      dif = 5;
      break;
    default:
      dif = 1;
  }
//   console.log("difficulty lvl", dif);
  const dbEnigmes = await db.query(
    `SELECT * FROM enigme WHERE difficulty=${dif} AND is_Verified=1`
  );
//   console.log(dbEnigmes);

  if (process.env.MODE === "test") {
    res.json({ enigmes: dbEnigmes, titre: req.query.q });
  } else {
    res.render("enigme", {
      enigmes: dbEnigmes,
      titre: req.query.q,
    });
  }
};
