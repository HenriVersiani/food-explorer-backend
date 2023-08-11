const Router = require("express");
const SessionController = require("../Controllers/SessionsController");
const sessionController = new SessionController()

const sessionRoutes = Router()

sessionRoutes.post("/", sessionController.create)


module.exports = sessionRoutes;
 
//MUDAR  TODA APLICAÇAO PARA FOOD ROUTES NAO USER.