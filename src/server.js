require("express-async-errors")
const express = require ("express");
var cors = require('cors')
const migrationsRun = require("./database/sqlite/migrations")
const AppError = require("./utils/AppError");
const routes = require("./routes");
const uploadConfig = require("./config/upload")

const app = express(); 

app.use(cors());

app.use(express.json())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

migrationsRun()

app.use((error, request, response, next) => {  

    if(error instanceof AppError){  
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    } 

    return response.status(500).json({
        status: "error",
        message: error.message
    })
})

const PORT = 5051;

app.listen(PORT,() => {
    console.log(`Server Running in Port ${PORT}`)
}) 