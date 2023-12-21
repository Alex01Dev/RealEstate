import express from 'express';
import multer from 'multer';
import { insertProperty, formProperty, saveProperty, formAddImage, loadImage } from '../controllers/propertyController.js';
import protectRoute from '../middlewares/protectRoute.js';
import upload from '../middlewares/uploadImage.js';

const router = express.Router();

// Configuración de multer

router.get('/create/', protectRoute, formProperty);
router.post('/create/', protectRoute, saveProperty);
router.get('/create/addImage/:id', protectRoute, formAddImage);
// router.post('/create/loadImage/:id', protectRoute, loadImage, (req, res) => {
//     // Este callback se ejecutará después de que el middleware loadImage haya completado su lógica
//     res.redirect('/login/home'); // Puedes redirigir a donde sea necesario
//   });
  

router.post('/create/loadImage/:id',protectRoute, upload.single('laimagen'),loadImage)
// router.post('/addImage/:id',protectRoute, upload.single('laimage') , loadImage)

export default router;
