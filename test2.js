// Inclusions
var fs = require('fs');
var swig = require('swig');
var mongoose = require('mongoose');
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
mongoose.connect('mongodb://localhost/testLocal', function(err) {
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
    	res.render('contentAccueil', { articles : articles});
    });

}); 