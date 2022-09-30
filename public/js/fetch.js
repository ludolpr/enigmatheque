var keyGive = "28067265-e1b2e13d58c37680a1a031824";
// key & import de paxabay
const img = document.getElementById("img")
// ici le querry selector
const tag = document.getElementById("tag") 
const motclef = tag.innerText
// document.querySelector("tag")
// faire un querry selector + boucle  for 
// for (let i = 0; i < pixdata.hits.length; i++) {
//   console.log(i);
//   img.src = pixdata.hits[i].previewURL;

  
// }

// console.log(motclef);
// console.log(motclef.toLowerCase().replaceAll(' ', '+').replaceAll("l'", ''));
// console.log(motclef.split(' '));
// console.log([motclef.split(' ').length - 1]);
// console.log(motclef.split(' ')[motclef.split(' ').length - 1]);

// keys mon parametre 
let getData = async (keys) => {
  // img.src= "../images/question.jpg"
  fetch(`https://pixabay.com/api/?key=${keyGive}&per_page=72&lang=fr&q=${encodeURIComponent(keys)}`) // mon parametre est integrée a l'url
    .then((response) => {
      if (response.ok) {
        response.json().then(function (pixdata) {
          console.log(pixdata.hits[0].webformatURL);

          if (pixdata.hits[0]) img.src = pixdata.hits[0].webformatURL
          else {
            const lastKey = motclef.split(' ')[motclef.split(' ').length - 1]
            console.log("lastKey", lastKey,pixdata.hits[0].hits.tag)
            getData(lastKey)
          }
          // console.log("pixdata", pixdata.hits[0].webformatURL);
        })
      } else {
        console.log("erreur");
        img.src = ("../images/question.jpg")
      }

    })
}

getData(motclef.toLowerCase().replaceAll(' ', '+').replaceAll("l'" || "s'" || "c'" || "n'" || "m'" || "d'", '')) // appelle de ma fonctionn ( keys === motclef)
