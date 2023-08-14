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

foodRoutes.put("/update/:id_plate", ensureAuthenticated, foodController.update)

foodRoutes.get("/foods/:id_category" , ensureAuthenticated, foodController.getLunchs)

foodRoutes.get("/detail/:id_plate" , ensureAuthenticated, foodController.getLunch)

foodRoutes.patch("/avatar/:plate_id", upload.single("avatar"), foodAvatarController.update)

foodRoutes.delete("/delete/:id_plate", foodController.delete)

foodRoutes.get("/search/category/:id_category", foodController.searchPlates)

module.exports = foodRoutes;