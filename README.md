# repos-site-enigmes



get    -> Select      -> Recruperation
post   -> inset into  -> Ajouter
put    -> Upadtae     -> Editer
delete -> Delete      -> Suprimer





// Connect node -> mysql
db.connect((err) => {
    if (err) console.error("error connecting: " + err.stack);
    console.log("connected as id " + db.threadId);
});

// Insert into
db.query(`INSERT INTO articles (title, price) values ('${title}', '${price}' );`, (err, data) => {
    if (err) console.log(err)
    console.log('script INSERT INTO', data)
})
db.query(`INSERT INTO articles (title, price) values ('${title}', '${price}' );`, (err, data) => {
    if (err) console.log(err)
    console.log('script INSERT INTO', data)
})

// Select
db.query('SELECT * FROM articles', (err, data) => {
    if (err) console.log(err)
    console.log('script SELECT', data)
})

// Update
db.query(`UPDATE articles SET title = '${title}-edit', price = '${price}-edit' WHERE id = 1;`, (err, data) => {
    if (err) console.log(err)
    console.log('script UPDATE', data)
})

// Delete
db.query('DELETE FROM articles WHERE id = 1;', (err, data) => {
    if (err) console.log(err)
    console.log('script INSERT INTO', data)
})

 
//save db

 mysqldump -u ludolpr –p dataenigme > backupDB.sql

 render  = renvoie la view ("home) + un objet au besoin.
 redirect = redirige sur une URL donc sur une route puis un controller

 <!--  formulaire de mail to admin
<form action="/mail" method="post" class="opacity-75 p-5">
          <div class="col-md-12">
            <div class="mb-6">
              <label for="exampleInputEmail1" class="form-label">Nom d'utilisateur</label>
              <input name="id_user" type="nom" class="form-control" placeholder="Votre nom d'utilisateur"
                aria-describedby="emailHelp" />
            </div>
            <div class="mb-6">
              <label for="exampleInputPassword" class="form-label">Votre email*</label>
              <input name="email" type="email" class="form-control" placeholder="Votre email" />
            </div>
          </div>

          <p>Sujet<br />
            <span class="wpcf7-form-control-wrap menu-742">
              <select name="sujet"
                class="form-label wpcf7-form-control form-control wpcf7-select wpcf7-validates-as-required"
                aria-required="true" aria-invalid="false">
                <option value="Contacter le webmaster">Contacter le webmaster</option>
                <option value="Signaler un bug">Signaler un bug</option>
                <option value="Autre">Autre</option>
              </select>
            </span>
          </p>
          <div class="container">
            <div class="row">
            <label for="exampleInputEmail1" class="form-label p-0">Tapez votre message ci-dessous</label>
              <textarea name="content" placeholder="Votre message" cols="70" rows="5"></textarea>

            </div>
            <div class="container">
              <div class="row d-flex justify-content-center">
                <button type="submit" class="mt-2 w-auto btn btn-primary">Envoyer</button>
              </div>
            </div>
          </div>
        </form>
  -->

  <!--  formulaire to message to pannel admin
  <form action="/message" method="post" class="opacity-75 p-5">
          <div class="col-md-12">
            <div class="mb-6">
              <label for="exampleInputEmail1" class="form-label">Nom d'utilisateur</label>
              <input name="name" type="nom" class="form-control" placeholder="Votre nom d'utilisateur"
                aria-describedby="emailHelp" />
            </div>
            <div class="mb-6">
              <label for="exampleInputPassword" class="form-label">Votre email*</label>
              <input name="email" type="email" class="form-control" placeholder="Votre email" />
            </div>
          </div>

          <p>Sujet<br />
            <span class="wpcf7-form-control-wrap menu-742">
              <select name="sujet"
                class="form-label wpcf7-form-control form-control wpcf7-select wpcf7-validates-as-required"
                aria-required="true" aria-invalid="false">
                <option value="Contacter le webmaster">Contacter le webmaster</option>
                <option value="Signaler un bug">Signaler un bug</option>
                <option value="Autre">Autre</option>
              </select>
            </span>
          </p>
          <div class="container">
            <div class="row">
            <label for="exampleInputEmail1" class="form-label p-0">Tapez votre message ci-dessous</label>
              <textarea name="message" placeholder="Votre message" cols="70" rows="5"></textarea>

            </div>
            <div class="container">
              <div class="row d-flex justify-content-center">
                <button type="submit" class="mt-2 w-auto btn btn-primary">Envoyer</button>
              </div>
            </div>
          </div>
        </form>
  
   -->