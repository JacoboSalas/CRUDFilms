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
});

//insertar en la colección
app.get('/insert', (req, res) => {
  res.render('insertFilm.ejs');
});

app.post('/films', (req, res) => {
  db.collection('film').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database');
    res.redirect('/films');
  })
});

//obtener las películas de la colección
app.get('/films', (req, res) => {
  db.collection('film').find().sort({ released: 1 }).toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {film: result});
  });
});

//borrar de la colección
app.post('/films/delete', (req, res) => {
  console.log('Deleted  '+ req.query.id);
  var ObjectId = require('mongodb').ObjectId;
  var id = req.query.id;
  db.collection("film").remove({ "_id" : ObjectId(id) });
  res.redirect('/films');
});

//modificar en la colección
app.post('/films/update', (req, res) => {
	console.log('para update  '+ req.query.id);
	var result = { 
		"id" : req.query.id ,
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
	var ObjectId = require('mongodb').ObjectId;
	var id = req.query.id;
	db.collection('film').update(
		{ _id:  ObjectId(id)},
		req.body,
		{ upsert: true }
	);
	res.redirect('/films');
});
