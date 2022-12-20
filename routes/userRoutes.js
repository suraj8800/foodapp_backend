const express = require("express");
const userRouter = express.Router();
const {getAllUsersController, profileController} = require("../controller/userController")
const {protectRoute} = require("../controller/authController");
// users -> get all the users -> sensitive route -> protected route.
userRouter.get("/users",protectRoute, getAllUsersController)

userRouter.get("/user", protectRoute, profileController)

module.exports = userRouter;