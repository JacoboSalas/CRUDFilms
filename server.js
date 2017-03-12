const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

var MONGODB_URL = "mongodb://JacoboSalas:Passw0rd_@cluster0-shard-00-00-jylxy.mongodb.net:27017,cluster0-shard-00-01-jylxy.mongodb.net:27017,cluster0-shard-00-02-jylxy.mongodb.net:27017/<DATABASE>?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

app.use(bodyParser.urlencoded({extended: true}));

var db;

MongoClient.connect(MONGODB_URL, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  });
});

app.listen(3000, function() {
  console.log('listening on 3000')
})





app.get('/', (req, res) => {
  res.sendFile(__dirname + '/pages/index.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
});


app.post('/film', (req, res) => {
  console.log(req.body)
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

*/