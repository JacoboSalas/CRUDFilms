const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

var MONGODB_URL = "mongodb://JacoboSalas:Passw0rd_@cluster0-shard-00-00-jylxy.mongodb.net:27017/filmsDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

var db;

MongoClient.connect(MONGODB_URL, (err, database) => {
  if (err) return console.log(err)
  db = database;
  app.listen(3000, () => {
    console.log('listening on 3000')
  });
});




//inicial
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/pages/index.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
});


//insert en la colección film
app.post('/films', (req, res) => {
  db.collection('film').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database');
    res.redirect('/');
  })
});

//obtener las películas de la colección


app.get('/films', (req, res) => {
  db.collection('film').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {film: result});
  });
});



app.post('/films/delete', (req, res) => {
	console.log('Deeleted  '+ req.query.id);
  res.send('DELETE request to homepage');
  var elID = req.query.id ;
  db.collection("film").remove( { "id" : elID });

  
});


app.post('/films/update', (req, res) => {
	console.log('para update  '+ req.query.id);
	var result = { 
		"id":req.query.id ,
		"title": req.query.title ,
		"description": req.query.description ,
		"rating": req.query.rating ,
		"released": req.query.released 
	};
	console.log('para update  '+ JSON.stringify(result));
	res.render('updateFilm.ejs', {film: result});
	
});


app.post('/films/updateDo', (req, res) => {
	console.log('haciendo el update de : '+ req.query.id);

	db.collection('film').update(
		{ id:  req.query.id},
		req.body,
		{ upsert: true }
	);
	res.redirect('/films');
});

/*
	DETALLES MONGO DB:
	https://cloud.mongodb.com/v2/58c588ccdf9db155f75b8d61#clusters/security/users
	
	mongodb DBaaS Passw0rd_
	Choose a name for your new MongoDB Atlas Group:
		JacoboAtlasGroup

	Admin Username & Password:
	JacoboSalas
	Passw0rd_
	
	USUARIO PARA LECTURA/ESCRITURA:
	dbuser
	dbuser01_
	
	Nombre de la BBDD: 
	films_database

*/