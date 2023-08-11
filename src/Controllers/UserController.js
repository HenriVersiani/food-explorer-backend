const AppError = require("../utils/AppError")
const { hash } = require("bcryptjs")
const sqliteConnection = require("../database/sqlite/")

class userController{
    async create(request, response) {         
        const {name, email, password, idProfile = 0} = request.body

        const database = await sqliteConnection();

        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])       

        if(checkUserExists){
            throw new AppError("Este e-mail ja está em uso.", 402)
        }

        const hashedPassword = await hash(password, 8)

       await database.run("INSERT INTO users (name, email, password, id_profile) VALUES (?, ?, ?, ?)",[name, email,hashedPassword,idProfile])       
        .catch((error) => {
            throw new AppError("ERRO: ", error)
        })

        return response.status(201).json()
    }
}
 

module.exports = userController;