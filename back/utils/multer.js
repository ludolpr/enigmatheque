// multer configuration
const multer = require("multer");
// zone de stockage multer
const storage = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  // format des images autoriser
  filename: (req, file, cb) => {
    // console.log('config multer', file, file.originalname.split('.')[0].toLowerCase())
    const ext = file.originalname.slice(-3),
      completed =
        file.originalname.split(".")[0].toLowerCase() +
        "_" +
        Date.now() +
        "." +
        ext;
    file.completed = completed;
    cb(null, completed);
  },
});
// initialiser les parametres de multer
const upload = multer({
  // reseigment sur le stockage
  storage: storage,
  // limite de taille
  limits: {
    files: 1,
  },
  // filtre pour config de l'extension autoriser par le middleware
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error("Le fichier doit être au format png, jpg, jpeg ou gif."));
    }
  },
});

// export de multer pour l'appeler dans le router
module.exports = upload;
