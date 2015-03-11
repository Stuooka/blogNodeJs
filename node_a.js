//REQUIRE
var swig = require('swig');
var express = require('express');
var app = express();
var mongoose = require ('mongoose');
var bodyParser = require ('body-parser');

//CONNECTION BDD
mongoose.connect('mongodb://localhost/tp');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("Connecté !");
});

//CREATION SERVER
var server = app.listen(1337, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://127.0.0.1:%s', port);
})

/*
function ajoutPony(name, race){
	//CREATION TABLE
	var ponySchema = mongoose.Schema({
		ponyName:String,
		ponyRace:String,
		vu:Boolean
	});	
	//COMPILATION EN MODELE
	var ponyModel = mongoose.model('Pony', {
		ponyName:String,
		ponyRace:String,
		vu:Boolean
	});

	newPony(name, race);
}

function newPony(name, race){
	var pony = new pony(
		{
			name:name,
			race:race,
			vu:false
		});
	pony.save(function(err){
		if(err)
			Console.log("Magic !");
			//pony.speak();
	});	
}
*/
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', '.'+'/views'); 

app.get('/:id', function (req, res) {
	
		/*
		data = swig.renderFile('template.html',{
				pagename:'awesome people',
				authors:['Stuooka', 'Cybat', 'Altaranth']
				});
		*/

  	res.render('content',{
				pagename:'Equestria',
				authors:['Stuooka', 'Cybat', 'Altaranth']
				});
})

app.get('/', function (req, res){

})

app.post('/', jsonParser, function (req, res) {
	ajoutPony(req.body.nomPost, req.body.racePost);

	var query = ponyModel.find();
	query.exec(function(err, variable){
		if (err) throw err;
		var infoNom;
		var infoRace;
		var info = infos;
		for (var i = 0; i < infos.lenght; i++) {
			infoNom = infos[i].ponyName;
			infoRace = infos[i].ponyRace;
			//traitement
		}
	});

	res.render('content', {
				equestria:infos
	});

})