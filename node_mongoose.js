// Inclusions
var fs = require('fs');
var swig = require('swig');
var mongoose = require('mongoose');
var mongo = require('mongodb');
var express = require('express');
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
app.use(bodyParser());
app.use(session({ cookie: {maxAge: 36000000, httpOnly: false}, secret: 'secret' })); 
app.use(express.static(__dirname+'/public'));

//Déclaration variable de session
var sess;

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
    date: {
        type: Date,
        default: Date.now
    },
    text: String,
    idArticle: String,
    idAuthor: String
});
// Création du Model pour les commentaires
var commentairesModel = mongoose.model('commentaires', commentairesSchema);

//Création du schéma pour les comptes utilisateurs
var compteSchema = new mongoose.Schema({
    id:Number,
    pseudo:String,
    mail:String,
    password:String,
    typeUser:Number
})
//Création du Model pour les comptes utilisateurs
var compteModel = mongoose.model('comptes', compteSchema);


//Gestion de la page d'accueil
app.get('/', function(req, res) {
    sess=req.session;
    
    //Récupération de tout les articles
    var articles;
    var query = articleModel.find();
    query.exec(function(err, articles) {
        if (err) { throw err; }

        res.render('contentAccueil', {
        	articles: articles,
            user: sess.user
		});
    });    
});

//Gestion de la navigation
app.get('/:page', function(req, res) {
    //Récupération de tout les articles
    var articles;
    var query = articleModel.find();
    sess = req.session;
    query.exec(function(err, articles) {
        if (err) { throw err; }		
			
		switch(req.params.page) {

			case 'accueil':
				res.render('contentAccueil', {
                    articles: articles,
                    user: sess.user
                });
			break;

            case 'admin':
                res.render('contentAdmin',{
                    user: sess.user
                });
            break;

            case 'disconnect':
                req.session.destroy(function(err){
                    if(err){
                        console.log(err);
                    }
                    else
                    {
                        res.redirect('/');
                    }
                });
            break;

            case 'compte':
                res.render('contentAccount',{
                    user: sess.user
                });
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
                            commentaires: comms,
                            user: sess.user
                        });
                    });
                    break;                       
                }

                case 'edit':
                    var type="";
                    if(req.query.type=='article'){
                        type='article';
                    }else if(req.query.type=='comment'){
                        type='comment';
                    }
                    res.render('contentEdit', {
                        id: req.query.id,
                        user: sess.user,
                        typeEdit: type
                    });
                break;

			default:
				res.render('contentAccueil', { 
                    articles: articles,
                    user: sess.user
                });
                break;
		}
    });    
});

//Gestion des actions POST
app.post('/:page', function(req, res) {
    switch(req.params.page){
        case 'compte' :

            if (req.body.form == 'register'){
                //Si le pseudo, le mot de passe et le mail sont rentrées
                if(req.body.pseudo != "" && 
                    req.body.mail != "" &&
                    req.body.password != ""){
                    //Création d'un nouveau compte
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
                    });  
                }else{
                    var errMessage = "Veuillez rentrer toutes les informations";
                    res.render('contentAccount', { 
                        errMessage: errMessage
                    });
                }                
            }

            if (req.body.form == 'connection') {
                //Si le pseudo et le mot de passe sont rentrées
                if(req.body.pseudoConnect != "" &&
                    req.body.passwordConnect != ""){
                    //Récupération de tout les comptes
                    var comptes;
                    var query = compteModel.find();
                    query.where('pseudo', req.body.pseudoConnect);

                    query.exec(function(err, comptes) {
                        if (err) { throw err; }
                        if (comptes[0].password == req.body.passwordConnect){
                            sess.user = comptes[0];
                            //sess.username = comptes[0].pseudo;
                            //sess.typeUser = comptes[0].typeUser;
                            req.session = sess;
                            req.session.save(function(err) {
                                res.redirect('/accueil');
                              // session saved 
                            });
                        }
                        else{
                            console.log("Bad password");
                            var errMessage = "Mauvais Login ou mauvais Mot de Passe";
                            res.render('contentAccount', { 
                                errMessage: errMessage
                            });
                        }
                    });
                }else{
                    var errMessage = "Veuillez rentrer toutes les informations";
                    res.render('contentAccount', { 
                        errMessage: errMessage
                    });
                }                
            }
        break;
       
        case 'article' :
            //Si le commentaire est écrit
            if(req.body.messageCommentaire != ""){
                //Création d'un nouveau commentaire
                var monCommentaire = new commentairesModel();
                monCommentaire.text = req.body.messageCommentaire;
                monCommentaire.idAuthor = req.body.authorId;
                monCommentaire.idArticle = req.body.idArticle;

                monCommentaire.save(function(err){
                    if(err) { throw err; }
                    console.log('Commentaire ajouté avec succès !');
                    //rechargement de la page
                    res.redirect('/article?id='+req.body.idArticle);
                });
            } 
        break;

        case 'admin':
            if(req.body.content != "" && req.body.title != ""){
                //Création d'un nouvel article
                var monArticle = new articleModel();
                monArticle.title = req.body.title;
                monArticle.author = req.body.author;
                monArticle.excerpt = req.body.content.substr(0, 6) + "...";
                monArticle.text = req.body.content;
                monArticle.save(function(err) {
                    if (err) { throw err; }
                    console.log('Article ajouté avec succès !');
                    //rechargement de la page
                    res.redirect('/admin');
                });
            }else{
                    var errMessage = "Veuillez rentrer toutes les informations";
                    res.render('contentAdmin', { 
                        errMessage: errMessage
                    });
                }   
        break;

        case 'edit':
            switch(req.body.edit){
                case 'editCommentPage':
                    res.redirect('/edit?type=comment&id='+req.body.idCommentEdit);
                break;

                case 'editArticlePage':
                    res.redirect('/edit?type=article&id='+req.body.idArticleEdit);
                break;

                case 'editComment':
                    if(req.body.messageCommentaire != ""){
                        commentairesModel.update(
                            {_id:req.body.idEditComment},
                            {
                                text:req.body.messageCommentaire
                            },
                            function(err) {
                                if(err) { throw err; }
                                console.log('Commentaire correctement édité !');
                                res.redirect('/');
                            });                        
                    }
                break;

                case 'editArticle':
                    if(req.body.title != "" && req.body.content != ""){
                        articleModel.update(
                            {_id:req.body.idEditArticle},
                            {
                                title:req.body.title,
                                excerpt:req.body.content.substr(0, 6) + "...",
                                text:req.body.content
                            },
                            function(err) {
                                if(err) { throw err; }
                                console.log('Article correctement édité !');
                                res.redirect('/');
                            });                        
                    }
                break;

                default:
                break;
            }
        break;

        case 'delete':
            if(req.body.delete == "DeleteArticle"){
                var query = articleModel.find();
                query.where('_id', req.body.idArticleDelete);
                res.redirect('/accueil');
                query.remove(function(err) {
                    if(err) { throw err; }
                    console.log('Article correctement supprimé !');
                });
            }
            if(req.body.delete == "DeleteComment"){
                var query = commentairesModel.find();
                query.where('_id', req.body.idCommentDelete);
                query.remove(function(err) {
                    if(err) { throw err; }
                    console.log('Commentaire correctement supprimé !');
                    res.redirect('/article?id='+req.body.idArticle);
                });
            }
        break;

        default:
        break;
    } 
});