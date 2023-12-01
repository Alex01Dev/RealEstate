import express, { response } from 'express' //EMCS6

const router = express.Router();

//Ruta atraves de GET 

router.get('/', (request, response) => response.render("layout/index.pug", {page:"home"}));
// router.get('/quienEres', (request, response) => response.send("Soy una aplicacion web en arquitectura SAO que utiliza NodeJS y Express y atenderé las solicitudes de informarcion de los usuarios"));
// router.get('/queUsas',(request,response) => response.send("Estoy desarrollado con el lenguaje de programacion JavaScript bajo el framework de NodeJS y utilizo Express y Nodemon."));
// router.get('/misDatos', (request,response) => response.json({nombre: 'Amauri',fechaNacimiento: 19-11-2004, matricula: '220419', grado: 4, grupo: 'B'}));


// //Rutas a traves de POST
// router.post('/', (request, response) => response.render("index.pug"));
// //Rutas a través de PUT
// router.put('/', (request, response) => response.send("You're trying to uptdate some propertiers of data using PUT"));
// //Rutas a través de PATCH
// router.patch('/', (request,response) => response.send("Hi, you're trying to update all data object through PATCH"));
// //Rutas a través de DELETE
// router.delete('/', (request,response) => response.send("Are you sure that you want to DELETE Data?"));

export default router;
//DELAY A INICICO DESPUES 3 SEG A LA ARRANCADA DEL SERVIDOR HOLA