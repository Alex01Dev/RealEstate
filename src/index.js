console.log("Hola mundo desde NodeJS  a travez de Express, modificado esta corriendo nodemon");
import app  from './app.js';

app.listen(3000, () => {
    console.log(`Server listening on port ${3000} \n URL: http://localhost:3000/api/BienesRaices_220419`);
})
//- Leaflet libreria para consumir API