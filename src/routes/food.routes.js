const Router = require("express");
const multer = require("multer")
const FoodController = require("../Controllers/FoodController");
const FoodAvatarController = require("../Controllers/FoodAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const uploadConfig = require("../config/upload")

const foodRoutes = Router()

const upload = multer(uploadConfig.MULTER)

const foodAvatarController = new FoodAvatarController()
const foodController = new FoodController()

foodRoutes.post("/" , ensureAuthenticated, foodController.create)
foodRoutes.put("/", ensureAuthenticated, foodController.update)

foodRoutes.get("/foods/:id_category" , ensureAuthenticated, foodController.getLunchs)

foodRoutes.get("/detail/:id_plate" , ensureAuthenticated, foodController.getLunch)

foodRoutes.patch("/avatar/:plate_id", upload.single("avatar"), foodAvatarController.update)


module.exports = foodRoutes;