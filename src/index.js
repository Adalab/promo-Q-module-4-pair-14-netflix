const express = require('express');
const cors = require('cors');
const movies = require('./data/movies.json');

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
  const gender = req.query.gender;
  console.log(gender);
  const sort = req.query.sort;
  const filterByGender= movies.filter((movie) =>{ return movie.gender.includes(gender)});
  
  console.log(filterByGender);
    
  const response ={
    success: true,
    movies: filterByGender,
  }
  resp.json(response)
});

const staticServer ='./src/public-react'
server.use(express.static(staticServer));