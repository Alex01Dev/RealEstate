import Express from "express";
import {formProperty, saveProperty} from "../controllers/propertyController.js";
import protectRoute from "../middlewares/protectRoute.js";


// import propertyController from "../controllers/PropertyReto.controller.js"

const router = Express.Router();

router.get("/create/", formProperty);
// router.post("/register-property", propertyController.registerProperty);
router.post("/create/",protectRoute, saveProperty);


export default router;