const FoodUserModel = require("../model/usermodle");
async function getAllUsersController(req, res) {
    try{
        let users = await FoodUserModel.find();
        // to send json data
        res.json(users);
    }catch(err){ 
        req.end(err.message);
    }
}

async function profileController(req, res){
    try{
        const userId = req.userId;
        const user = await FoodUserModel.findById(userId);

        res.json({
            data:user,
            message: "Data about logged in user is send"
        })
    } catch(err){
        res.end(err.message);
    }
}

module.exports = {
    profileController:profileController,
    getAllUsersController:getAllUsersController
}