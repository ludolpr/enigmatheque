var keyGive = "28067265-e1b2e13d58c37680a1a031824";
// key & import de paxabay
const img = document.getElementById("img")
const tag = document.getElementById("tag")
const motclef = tag.innerHTML

getData = async (motclef) => {
  img.src= "../images/question.jpg"
  fetch(`https://pixabay.com/api/?key=${keyGive}&per_page=72&lang=fr&q=${encodeURIComponent(motclef)}`)
    .then((response) => {
      if (response.ok) {
        response.json().then(function (pixdata) {
          img.src = pixdata.hits[0].largeImageURL
          // console.log("pixdata", pixdata.hits[0].webformatURL);
          console.log(pixdata);
        })
      } else {
        console.log("erreur");
        img.src = ("../images/question.jpg")
      }

    })
}
console.log(motclef);
const titre = motclef
getData(titre.replaceAll(' ', '+'));