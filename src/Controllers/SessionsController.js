const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const {compare} = require("bcryptjs")
const authConfig = require("../config/auth")
const {sign} = require("jsonwebtoken")

class SessionController{
    async create(request, response){
        
        const {email, password} = request.body

        const user = await knex("users").where({ email }).first()

        if(!user){
            throw new AppError("Email e/ou senha incorreto", 401)
        }

        if(user.id_profile === 1){
            user.perfil = "admin"
        }else{
            user.perfil = "user"
        }

         //esta chegando

        const passwordMatched = await compare(password, user.password)

        if(!passwordMatched){
            throw new AppError("Email ou senha incorreto", 401)            
        }

        
        
        const {secret, expiresIn} = authConfig.jwt;
        
        const token = sign({},secret,{
            subject: String(user.id),
            expiresIn
        })

        console.log(token)
        

        return response.json({ user, token })
    }
}
 

module.exports = SessionController;