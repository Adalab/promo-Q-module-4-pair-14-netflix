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
  console.log(req.query);
  console.log('holaaa');
  const gender = req.query.gender;
  const filterByGender= movies.filter((movie) =>{movie.gender === gender
  });
  console.log(filterByGender);
    
  const response ={
    success: true,
    movies: filterByGender,
  }
  console.log(response);
  resp.json(response)
});

const staticServer ='./src/public-react'
server.use(express.static(staticServer));