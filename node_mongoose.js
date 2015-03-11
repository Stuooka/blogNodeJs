// Inclusion de Mongoose
var mongoose = require('mongoose');
 
// On se connecte à la base de données
// N'oubliez pas de lancer ~/mongodb/bin/mongod dans un terminal !
mongoose.connect('mongodb://localhost/local', function(err) {
  if (err) { throw err; }
});
 
// Création du schéma pour les commentaires
var articleSchema = new mongoose.Schema({
  id : Number,
  title : String,
  author : String,
  date : { type : Date, default : Date.now },
  excerpt : String,
  text : String
});

// Création du Model pour les commentaires
var articleModel = mongoose.model('articles', articleSchema);


var express = require('express');

var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());

app.get('/', function(req, res){

  var html = '<form action="/" method="post">' +
               'Title:' +
               '<input type="text" name="title" />' +
               '<br>' +
			   'Author:' +
			   '<input type="text" name="author" />' +
               '<br>' +
			   'Text:' +
			   '<input type="text" name="text" />' +
               '<br>' +
               '<button type="submit">Submit</button>' +
            '</form>';
	var query = articleModel.find();

	query.exec(function (err, articlesList) {
	  if (err) { throw err; }

	  var article;
	  for (var i = 0, l = articlesList.length; i < l; i++) {
		article = articlesList[i];
		html = html + '<h2>' + article.title + ' par ' + article.author + ' le ' + article.date + '</h2>'+
				'<p>'+ article.excerpt + '</p>' + '<p>' + article.text + '</p>';
	  }
	  
               
		res.send(html);

	});

});


app.post('/', function(req, res){
  
  

	var monArticle = new articleModel();
	monArticle.title = req.body.title;
	monArticle.author = req.body.author;
	monArticle.excerpt = req.body.text.substr(0, 6) + "...";
	monArticle.text = req.body.text;
	 

	monArticle.save(function (err) {
	  if (err) { throw err; }
	  console.log('Article ajouté avec succès !');

	});





  
  var html = '<a href="/">Try again.</a>';

	res.send(html);
});
    
var server = app.listen(3000, function () {

  var port = server.address().port;

  console.log('Le serveur est en http://127.0.0.1:%s', port);

});