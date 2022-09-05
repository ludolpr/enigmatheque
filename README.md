# ENIGMATHEQUE 
_(juste en dessous des badges sympatiques à placer)_

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)  [![forthebadge](http://forthebadge.com/images/badges/powered-by-electricity.svg)](http://forthebadge.com)

Mon projet d'examen, pour valider mes compétences

## Pour commencer

Developper l'interface et les visuels du site puis compttnuer avec le backend

### Pré-requis

Ce qu'il est requis pour commencer avec votre projet...

- html, css, bootstrap, sass
- MySql, workbench
- VPS, nginx

### Installation

Les étapes pour installer:


 Executez la commande ``npm i`` pour installer les modules, installer ``Mysql`` et connecter vous à la base de données. 
 <br> N'oublier pas votre ``.env``


## Démarrage

Pour lancer le projet taper la commande ``npm run dev``

## Fabriqué avec

Entrez les programmes/logiciels/ressources que vous avez utilisé pour développer votre projet

_exemples :_
* [vscode](https://code.visualstudio.com/) - Visual Studio Code
* [Atom](https://atom.io/) - Editeur de textes

## Contributing

Si vous souhaitez contribuer, lisez le fichier [CONTRIBUTING.md](https://example.org) pour savoir comment le faire.

## Versions
Listez les versions ici 
_exemple :_
**Dernière version stable :** 5.0
**Dernière version :** 5.1
Liste des versions : [Cliquer pour afficher](https://github.com/your/project-name/tags)
_(pour le lien mettez simplement l'URL de votre projets suivi de ``/tags``)_

## Auteurs
Listez le(s) auteur(s) du projet ici !
* **Jhon doe** _alias_ [@outout14](https://github.com/outout14)

Lisez la liste des [contributeurs](https://github.com/your/project/contributors) pour voir qui à aidé au projet !

_(pour le lien mettez simplement l'URL de votre projet suivi de ``/contirubors``)_

## License

Ce projet est sous licence ``exemple: WTFTPL`` - voir le fichier [LICENSE.md](LICENSE.md) pour plus d'informations




NOTE CI DESSOUS

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

