var keyGive = "28067265-e1b2e13d58c37680a1a031824";
// key & import de paxabay
const img = document.getElementById("img")
getData = async () => {

  fetch(`https://pixabay.com/api/?key=${keyGive}&per_page=72&lang=fr`)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (pixdata) {
          img.src = pixdata[0]
          // console.log(response);
          getImg(pixdata);
          console.log("pixdata", pixdata);
        })
      } else {
        console.log("erreur");
      }
      // console.log("1",response.headers.get('Content-Type'));
      // console.log("2",response.headers.get('Date'));

      // console.log("3",response.status);
      // console.log("4",response.statusText);
      // console.log("5",response.type);
      // console.log("6",response.url);

    }

    )




}
getData();
// console.log("data", getData);



getImg = async (data) => {
  console.log(data.hits[0]);

  // boucle
  for (let i = 0; i < data.length; i++) {
    console.log("i test", i);
// recupere image
    img.src = data.hits[i].webformatURL;
    // recupere tags
    titre.name = data.hits[i].tags;
  }

  // lier le tags a l'image 
  // afficher le resultat dans sources( src )

  // le filtre  if { name < 6 no search} else ( passe au name suivant)
}