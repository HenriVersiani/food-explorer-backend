const { Router } = require("express")

const userRoutes = require("./user.routes")
const foodRoutes = require("./food.routes")
const sessionRoutes = require("./session.routes")

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/food", foodRoutes)
routes.use("/session", sessionRoutes)


module.exports = routes
