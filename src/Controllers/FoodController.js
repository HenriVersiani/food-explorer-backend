const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite/");

class foodController{

    async getLunchs(request, response) {  

        const { id_category } = request.params      
        
        const database = await sqliteConnection();

        const lunchs = await database.all("SELECT * FROM plates WHERE id_category = (?)", [id_category])      
      
        return response.status(201).json(lunchs)
    }  

    async getLunch(request, response) {  

        const { id_plate } = request.params      
        
        const database = await sqliteConnection();

        const lunch = await database.get("SELECT * FROM plates WHERE id = (?)", [id_plate])

        const lunchTags = await database.all("SELECT * FROM plates_tags WHERE id_plate = (?)", [id_plate])
        
        const fullFunch = {lunch, lunchTags}
      
        return response.status(201).json(fullFunch)
    }  

    async create(request, response) {         
        const {plateName, price, description, idCategory, tags} = request.body
        const user_id = request.user.id
        const database = await sqliteConnection();

        const checkFoodExists = await database.get("SELECT * FROM plates WHERE name = (?)", [plateName])       

        if(checkFoodExists){
            throw new AppError("Este prato já existe.")
        }
      
        await database.run("INSERT INTO plates (name, value, description, id_user, id_category) VALUES (?, ?, ?, ?, ?)" , 
            [plateName, price,description,user_id,idCategory])
            .then((data) => {

                tags.forEach(async (tag) => {        

                    await database.run("INSERT INTO plates_tags (name, id_plate) VALUES (?, ?)" , [tag, data.lastID])
            
                }) 
               
            })
            .catch((error) => {
                throw new AppError("ERRO: ", error)
            })
      
        return response.status(201).json()
    }


async update(request,response){
    const { name, value} = request.body;
    const user_id = request.user.id
    const database = await sqliteConnection();
    const food = await database.get("SELECT * FROM plates WHERE id = (?)", [id]);

    

    if(!food){
        throw new AppError ("Prato nao encontrado");
    }

food.name = name;
food.value = value;

    try {
        await database.run(`
    UPDATE plates SET 
    name= ?,
    value = ?,
    updated_at = ?
    WHERE id = ?`,
    [food.name, food.value, new Date(), id]);
    } catch (error) {
        throw new AppError ("SQL ERROR ",error);
    }


return response.status(200).json()
}}

module.exports = foodController;  