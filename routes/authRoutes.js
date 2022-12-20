const express = require("express");
const authRouter = express.Router();
const {signUpController,
    loginController,
    forgetPasswordController,
    resetPasswordController 
    } = require("../controller/authController")
//signup
authRouter.post("/signup", signUpController)

// login input: email + password
authRouter.post("/login", loginController)

authRouter.patch("/forgetPassword", forgetPasswordController)

authRouter.patch("/resetPassword", resetPasswordController)

module.exports = authRouter;