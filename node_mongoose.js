// Inclusions
var fs = require('fs');
var swig = require('swig');
var mongoose = require('mongoose');
var mongo = require('mongodb');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser());


//Création du serveur web
var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Le serveur est en http://127.0.0.1:%s', port);
});

//Appel des view swig
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', '.' + '/views');


// On se connecte à la base de données
// N'oubliez pas de lancer ~/mongodb/bin/mongod dans un terminal !
mongoose.connect('mongodb://localhost/blog', function(err) {
    if (err) {
        throw err;
    }
});

// Création du schéma pour les articles
var articleSchema = new mongoose.Schema({
    id: Number,
    title: String,
    author: String,
    date: {
        type: Date,
        default: Date.now
    },
    excerpt: String,
    text: String
});
// Création du Model pour les articles
var articleModel = mongoose.model('articles', articleSchema);

// Création du schéma pour les commentaires
var commentairesSchema = new mongoose.Schema({
    id: Number,
    authorPseudo: String,
    authorMail: String,
    date: {
        type: Date,
        default: Date.now
    },
    text: String,
    idArticle: String
});
// Création du Model pour les commentaires
var commentairesModel = mongoose.model('commentaires', commentairesSchema);

//Création du schéma pour les comptes utilisateurs
var compteSchema = new mongoose.Schema({
    id:Number,
    pseudo:String,
    mail:String,
    password:String,
    typeUser:Boolean
})
//Création du Model pour les comptes utilisateurs
var compteModel = mongoose.model('comptes', compteSchema);


//Gestion de la page d'accueil
app.get('/', function(req, res) {
    //Récupération de tout les articles
    var articles;
    var query = articleModel.find();

    query.exec(function(err, articles) {
        if (err) { throw err; }

        res.render('contentAccueil', {
        	articles: articles
		});
    });    
});

//Gestion de la navigation
app.get('/:page', function(req, res) {
    //Récupération de tout les articles
    var articles;
    var query = articleModel.find();

    query.exec(function(err, articles) {
        if (err) { throw err; }		
			
		switch(req.params.page) {

			case 'accueil':
				res.render('contentAccueil', { articles: articles });
			break;

            case 'admin':
                res.render('contentAdmin');
            break;

            case 'compte':
                res.render('contentAccount');
            break;

            case 'article':
                //Récupération d'un article selon l'id selectionnée (lien) 
                if(req.query.id){
                    var article = articles.filter(function(element){
                        return element._id.toString() == req.query.id; 
                    })

                    //Récupération de tout les commentaires liés à cet article
                    var commentaires;
                    var commentQuery = commentairesModel.find();
                    commentQuery.where('idArticle', article[0]._id.toString());
                    commentQuery.exec(function(err, comms){
                        if(err) { throw err; }
                        commentaires=comms;

                        //Envois de l'article et de ses commentaires à la page
                        //spécifique aux articles
                        res.render('contentArticle', { 
                            article: article[0],
                            commentaires: comms 
                        });
                    });
                    break;                       
                }

			default:
				res.render('contentAccueil', { articles: articles });
                break;
		}
    });    
});

//Gestion des actions POST
app.post('/:page', function(req, res) {
/*   
    if(req.body.register)
    {
        var monCompte = new compteModel();
        monCompte.pseudo = req.body.pseudo;
        monCompte.mail = req.body.mail;
        monCompte.password = req.body.password;
        monCompte.typeUser = req.body.typeUser;

        monCompte.save(function(err){
                    if(err) { throw err; }
                console.log('Compte créé avec succès !');
                //rechargement de la page
                res.redirect('/accueil');
        }
    }

    if(req.body.connection)
    {
        //Récupération de tout les comptes
        var comptes;
        var query = articleModel.find();

        query.exec(function(err, comptes) {
            if (err) { throw err; }

            //FOR EACH POUR CHERCHER PARMIS LES USERS
        }); 
    }
    else
    {  
*/
        switch(req.params.page){

            case 'article' :
                //Création d'un nouveau commentaire
                var monCommentaire = new commentairesModel();
                monCommentaire.authorPseudo = req.body.authorPseudo;
                monCommentaire.authorMail = req.body.authorMail;
                monCommentaire.text = req.body.messageCommentaire;
                monCommentaire.idArticle = req.body.idArticle;

                monCommentaire.save(function(err){
                    if(err) { throw err; }
                console.log('Commentaire ajouté avec succès !');
                //rechargement de la page
                res.redirect('/article?id='+req.body.idArticle);
            });
            break;

            case 'admin':
                //Création d'un nouvel article
                var monArticle = new articleModel();
                monArticle.title = req.body.title;
                monArticle.author = req.body.author;
                monArticle.excerpt = req.body.content.substr(0, 6) + "...";
                monArticle.text = req.body.content;

                monArticle.save(function(err) {
                    if (err) {
                        throw err;
                    }
                    console.log('Article ajouté avec succès !');
                    //rechargement de la page
                    res.redirect('/admin');
                });
            break;

            default:
            break;
        }
    //}  
});