const express = require('express');
const cors = require('cors');
const movies = require('./data/movies.json');
const Database = require('better-sqlite3')
const db = new Database ('./src/database.db', { verbose: console.log })

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});


server.get('/movies', (req, resp)=>{

  const query = db.prepare(`
  SELECT id, name, gender, image
  FROM movies
  `);

  const allMovies = query.all();
  
  const response ={
    sucess: true,
    movies: allMovies
  }
  resp.json(response);

  const queryGender = db.prepare(`
  SELECT id, name, gender, image
  FROM movies
  WHERE gender =?`)
  
  const gender = req.query.gender;
  
  const movieGender = queryGender.all(gender)


   

   /*console.log(gender);
   const sort = req.query.sort;
   const filterByGender= movies.filter((movie) =>{ return movie.gender.includes(gender)});
  
   console.log(filterByGender);
    
   const response ={
     success: true,
     movies: filterByGender,
   }
   resp.json(response)*/

});

server.get('/movies/:movieId', (req, res) =>{
  console.log(req.params.movieId);
  const moviesData = movies.find((oneMovie)=> oneMovie.id === req.params.movieId);
});

server.post ('/login', (req, res) => {
  console.log('Query params:', req.query);
})



const staticServer ='./src/public-react'
server.use(express.static(staticServer));

//servidor estáticos fotos
const staticServerImg = './src/public-movies-images'
server.use(express.static(staticServerImg));