const express = require('express');
const cors = require('cors');
const users = require('./data/users.json');
const Database = require('better-sqlite3');
const db = new Database ('./src/database.db', { verbose: console.log })

// create and config server
const server = express();
server.use(cors());
server.use(express.json());
server.set('view engine', 'ejs')

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// endpoint movies
server.get('/movies', (req, resp)=>{

  const query = db.prepare(`
  SELECT *
  FROM movies
  `);

  const allMovies = query.all();

  const queryGender = db.prepare(`
  SELECT *
  FROM movies
  WHERE gender =?`)
  
  const gender = req.query.gender;
  
  const genderFilter = queryGender.all(gender)

  const sortFilter = req.query.sort;

  const movies = gender === '' ? allMovies : genderFilter

  const response ={
    sucess: true,
    movies: movies
  }
  resp.json(response);


});

// endpoint login
server.post('/login', (req, resp) => {
  console.log(req.body);
  const oneUser = users
    .find((user) => user.email === req.body.email)
    .find((user) => user.password === req.body.password);
    if(oneUser){
      resp.json({ "success": true,
      "userId": "id_de_la_usuaria_encontrada" });
    } else {
      resp.json({ "success": false,
      "errorMessage": "Usuaria/o no encontrada/o" })
    }
});


server.get('/movies/:movieId', (req, res) =>{


  const queryId = db.prepare(`
  SELECT id
  FROM movies`)

  const movieId = queryId.get()

  console.log(movieId);

  res.render('movie', movieId)
});



// server.post ('/login', (req, res) => {
//   console.log('Query params:', req.query);
// })



const staticServer ='./src/public-react'
server.use(express.static(staticServer));

//servidor estáticos fotos
const staticServerImg = './src/public-movies-images'
server.use(express.static(staticServerImg));