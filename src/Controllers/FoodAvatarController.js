const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class FoodAvatarController{
    async update(request, response){
        const { plate_id } = request.params
        console.log('plate_id:', plate_id)
        //const user_id = request.user.id // precisa achar o user e id
        const avatarFileName = request.file.filename // precisa achar o file e filename
       
        const diskStorage = new DiskStorage()

        const plate = await knex("plates").where({id: plate_id}).first()

      //  if(!user){
      //      throw new AppError("Somente Usuarios autenticacdos podem mudar o avatar")
      //  } 

        if(plate.avatar){
            await diskStorage.deleteFile(plate.avatar)
        }

        const filename = await diskStorage.saveFile(avatarFileName)
        plate.avatar = filename;

        await knex("plates").update(plate).where({id: plate_id})

        return response.json(plate)
    }                                               
}

module.exports = FoodAvatarController;