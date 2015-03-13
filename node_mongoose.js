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


app.get('/', function(req, res) {

    var articles;

    var query = articleModel.find();

    query.exec(function(err, articles) {
        if (err) {
            throw err;
        }

        res.render('contentAccueil', {
        	articles: articles
		});
    });    
});

app.get('/:page', function(req, res) {

    console.log("GET : "+req.params.page);

    var articles;

    var query = articleModel.find();

    query.exec(function(err, articles) {
        if (err) {
            throw err;
        }		
			
		switch(req.params.page) {
			case 'accueil':
				res.render('contentAccueil', { articles: articles });
			break;
            case 'admin':
                res.render('contentAdmin');
            break;
            case 'article':
                if(req.query.id){
                    var article = articles.filter(function(element){
                        return element._id.toString() == req.query.id; 
                    })

                    var commentaires;
                    var commentQuery = commentairesModel.find(null);
                    commentQuery.where('idArticle', article[0]._id.toString());
                    commentQuery.exec(function(err, comms){
                        if(err) { throw err; }
                        commentaires=comms;
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

app.post('/:page', function(req, res) {

    console.log("POST : "+req.params.page);

    switch(req.params.page){
        case 'article' :
            var monCommentaire = new commentairesModel();
            monCommentaire.authorPseudo = req.body.authorPseudo;
            monCommentaire.authorMail = req.body.authorMail;
            monCommentaire.text = req.body.messageCommentaire;
            monCommentaire.idArticle = req.body.idArticle;

            monCommentaire.save(function(err){
                if(err)
                    throw err;
            console.log('Commentaire ajouté avec succès !');
            res.redirect('/article?id='+req.body.idArticle);
        });
        break;
        case 'admin':
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
                res.redirect('/admin');
            });
        break;
        default:
        break;
    }
    

    
});