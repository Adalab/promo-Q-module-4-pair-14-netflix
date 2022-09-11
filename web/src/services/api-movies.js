// login

const getMoviesFromApi = (params) => {
    console.log(params);
    // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
    const genderParam= params.gender
    const sortParam = params.sort
    const queryParams = `?gender=${genderParam}&sort=${sortParam}`
    return fetch('//localhost:4000/movies' + queryParams)
      .then(response => response.json())
      .then((data) => {
        // CAMBIA EL CONTENIDO DE ESTE THEN PARA GESTIONAR LA RESPUESTA DEL SERVIDOR Y RETORNAR AL COMPONENTE APP LO QUE NECESITA
        return data;
      });
  };
  
  const objToExport = {
    getMoviesFromApi: getMoviesFromApi
  };
  
  export default objToExport;