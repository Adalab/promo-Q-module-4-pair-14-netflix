const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const db = new Database ('./src/database.db', { verbose: console.log })
const dbUsers = new Database ('./src/data-users.db', { verbose: console.log })

// create and config server
const server = express();
server.set('view engine', 'ejs')
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

const query = db.prepare(`
  SELECT *
  FROM movies
  `);

// endpoint movies
server.get('/movies', (req, resp)=>{

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
  const queryUsers = dbUsers.prepare(
    `SELECT * FROM dataUsers WHERE email = ? AND password = ?`
  );
  const oneUser = queryUsers.get(req.body.email, req.body.password);
  if (oneUser){
    resp.json({ "success": true,
    "userId": "id_de_la_usuaria_encontrada" });
  } else {
    resp.json({ "success": false,
      "errorMessage": "Usuaria/o no encontrada/o" });
  }
});


server.get('/movies/:movieId', (req, res) =>{

  const queryId = db.prepare(`
  SELECT id
  FROM movies`)

  const movieId = queryId.get()

  const movieDetail =query.get()

  res.render('movie', movieDetail)

});


//servidor de estáticos
const staticServer ='./src/public-react'
server.use(express.static(staticServer));

//servidor de estáticos para los estilos
const staticServerStyles = 'src/public-react/static/public-css'
server.use(express.static(staticServerStyles));

//servidor estáticos fotos
const staticServerImg = './src/public-movies-images'
server.use(express.static(staticServerImg));