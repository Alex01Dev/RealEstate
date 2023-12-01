import express, { response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import propertyRoutes from './routers/propertyRoutes.js';
import generalRouter from './routers/generalRouter.js';
import db from './config/db.js';
import userRouter from './routers/userRouter.js';
import {User,Category,Price,Property} from './models/relations.js';

dotenv.config({ path: "src/.env" });

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Configuración de la base de datos
try {
  await db.authenticate();
  await db.sync();
  console.log("Conexión a la Base de Datos Exitosa");
} catch (error) {
  console.error("Error durante la conexión o configuración del servidor:", error);
}


// Configuración de vistas y archivos estáticos
app.set('view engine', 'pug');
app.set('views', './src/views');
app.use(express.static('./src/public'));

// Configuración de rutas
app.use('/', generalRouter);
app.use('/login', userRouter);
app.use('/property',propertyRoutes);

// Configuración del puerto
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`El servidor web ha sido iniciado y está esperando solicitudes en el puerto: ${PORT}`);
});

app.use(helmet.contentSecurityPolicy({
  directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://unpkg.com', 'https://cdnjs.cloudflare.com', "'unsafe-eval'"],
      styleSrc: ["'self'", 'https://unpkg.com', 'https://cloudflare.com', 'https://cdnjs.cloudflare.com'],
      imgSrc: ["'self'", 'data:', 'https://unpkg.com', 'https://cloudflare.com', 'https://cdnjs.cloudflare.com', 'https://a.tile.openstreetmap.org', 'https://b.tile.openstreetmap.org', 'https://c.tile.openstreetmap.org'],
      connectSrc: ["'self'", 'https://tile-provider-domain.com', 'https://geocode.arcgis.com'],
  },
}));

export default app;


  
// app.get("/",(request,response) => {
//     console.log("Escuchando una peticion GET desde el protocolo HTTP...");//esto lo que pasa al servidor
//     response.send("Hola web!");//esto le pinta en la pagina web (cliente por el response)
// });
//     //Callback = llamada de regreso(funcion que voy hacer)

// app.get("/quienEres",(request,response)=>{
//     console.log("Respondiendo a la pregunta ¿Quién Eres?...");//esto lo que pasa al servidor
//     response.send("Soy una aplicacion web en arquitectura SAO que utiliza NodeJS y Express y atenderé las solicitudes de informarcion de los usuarios");
// });

// app.post("/quienEres",(request,response)=>{
//     console.log("Atendiendo solicitud post...");//esto lo que pasa al servidor
//     response.send("Hola desde POST");
// });

// app.get("/queUsas",(request,response)=>{
//     console.log("Respondiendo a la pregunta ¿Qué usas?");//esto lo que pasa al servidor
//     response.send("Estoy desarrollado con el lenguaje de programacion JavaScript bajo el framework de NodeJS y utilizo Express y Nodemon.");
// });

// app.get("/misDatos",(request,response)=>{
//     console.log("Escuchando una peticion GET desde el protocolo HTTP...");//esto lo que pasa al servidor
//     response.json({nombre: 'Amauri', matricula: '220419', grado: 4, grupo: 'B'});
// });
