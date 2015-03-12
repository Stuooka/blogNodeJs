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

// Création du schéma pour les commentaires
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

// Création du Model pour les commentaires
var articleModel = mongoose.model('articles', articleSchema);


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
            case 'article':
                if(req.query.id){
                    var article = articles.filter(function(element){
                        return element._id.toString() == req.query.id; 
                    })
                    console.log(article);
                    res.render('contentArticle', { article: article[0] });
                    break;
                }
			default:
				res.render('contentAccueil', { articles: articles });
		}
    });    
});

app.post('/contentAdmin', function(req, res) {

    var monArticle = new articleModel();
    monArticle.title = req.body.title;
    monArticle.author = req.body.author;
    monArticle.excerpt = req.body.text.substr(0, 6) + "...";
    monArticle.text = req.body.text;

    monArticle.save(function(err) {
        if (err) {
            throw err;
        }
        console.log('Article ajouté avec succès !');
        res.redirect('/');
    });

    
});