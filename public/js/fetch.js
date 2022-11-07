var keyGive = "28067265-e1b2e13d58c37680a1a031824";
// key & import de pixabay
let img = document.querySelectorAll("#imgFetch");
// ici le querry selector
const tag = document.querySelectorAll("#tag");
// const motclef = tag.innerText;
// (keys) = mon parametre
let nbImg = 0;
let getData = async (keys) => {
  fetch(
    `https://pixabay.com/api/?key=${keyGive}&per_page=72&lang=fr&q=${encodeURIComponent(
      keys
    )}`
  ) // mon parametre est integrée a l'url
    .then((response) => {
      // si reponse est ok
      if (response.ok) {
        response
          .json()
          .then(function (pixdata) {
            if (pixdata.hits[0].webformatURL)
              // Si j’ai pixdata.hits[0] alors je build l’image avec pixdata.hits[0].webformatURL
              return pixdata.hits[0].webformatURL;
            else {
              // appelle de ma fonctionn ( keys === motclef)
              const lastKey = motclef.split(" ")[motclef.split(" ").length - 1];
              console.log("lastKey", lastKey, pixdata.hits[0].hits.tag);
              // lastkey me permet de garder seulement le dernier mot clef et de relancer une requête avec fetch
              getData(lastKey);
            }
          })
          // deuxieme .then reprend pixdata.hits[0].webformatURL ( url )
          .then(function (url) {
            console.log("Image:", img, "nbImg:", (img[nbImg].src = url));
            // definie la source de l'id image par rapport a nbImg
            img[nbImg].src = url;
            // ajoute +1
            nbImg++;
          });
      } else {
        console.log("erreur");
      }
    });
};
// boucle le nombre de fois qu'il y a de tag
for (let i = 0; i < tag.length; i++) {
  let element = tag[i];
  getData(
    element.innerText
      .toLowerCase()
      .replaceAll(" ", "+")
      .replaceAll("l'" || "s'" || "c'" || "n'" || "m'" || "d'", "")
  );
}
