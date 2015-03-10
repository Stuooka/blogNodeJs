// Inclusion de Mongoose
var mongoose = require('mongoose');
 
// On se connecte à la base de données
// N'oubliez pas de lancer ~/mongodb/bin/mongod dans un terminal !
mongoose.connect('mongodb://localhost/local', function(err) {
  if (err) { throw err; }
});
 
// Création du schéma pour les commentaires
var commentaireArticleSchema = new mongoose.Schema({
  id : Number,
  contenu : String,
  date : { type : Date, default : Date.now }
});

// Création du Model pour les commentaires
var CommentaireArticleModel = mongoose.model('test2', commentaireArticleSchema);


var express = require('express');

var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());

app.get('/', function(req, res){

  var html = '<form action="/" method="post">' +
               'Enter your name:' +
               '<input type="text" name="userName" placeholder="..." />' +
               '<br>' +
               '<button type="submit">Submit</button>' +
            '</form>'+
			'<ul>';
	var query = CommentaireArticleModel.find();

	query.exec(function (err, comms) {
	  if (err) { throw err; }

	  var comm;
	  for (var i = 0, l = comms.length; i < l; i++) {
		comm = comms[i];
		html = html + '<li>' + comm.contenu + '</li>'
	  }
	  
	  	html = html + '</ul>';
               
		res.send(html);

	});

});


app.post('/', function(req, res){
  var userName = req.body.userName;
  
  

	var monCommentaire = new CommentaireArticleModel({ id : '1' });
	monCommentaire.contenu = userName;
	 

	monCommentaire.save(function (err) {
	  if (err) { throw err; }
	  console.log('Commentaire ajouté avec succès !');

	});





  
  var html = '<a href="/">Try again.</a>';

	res.send(html);
});
    
var server = app.listen(3000, function () {

  var port = server.address().port;

  console.log('Le serveur est en http://127.0.0.1:%s', port);

});