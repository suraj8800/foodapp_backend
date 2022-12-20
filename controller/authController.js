const jwt = require("jsonwebtoken");
const secrets = require("../secrets");
const mailSender = require("../utilities/mailSender");

const FoodUserModel = require("../model/usermodle")

//*********************** Controller **************
async function signUpController(req, res){
    try {
        let data = req.body;
        console.log(data);
        //use to create a document inside userModel
    
        let newUser = await FoodUserModel.create(data);
        console.log(newUser);
        res.status(201).json({
            result: "user signed up" 
        });
    }catch(err) {
        res.status(400).json({
            result: err.message
        });
    }
}

async function loginController(req, res) {
    try{
        let data = req.body;
        let {email, password} = data;
        if(email && password){
            let user = await FoodUserModel.findOne({email: email});
            if(user){
                if(user.password == password){
                    // payload, secret text, algorithm -> SHA256.
                    const token = jwt.sign({data: user["_id"], exp: Math.floor(Date.now() / 1000) + (60*60*24)}, secrets.JWTSECRET);
                    // put token into cookies
                    res.cookie("JWT", token);

                    //send the token
                    user.password = undefined;
                    user.confirmPassword= undefined;
                    console.log("login", user);
                    // before send to frontend
                    res.status(200).json({
                        user
                    })
                }else{
                    // email or password not match
                    res.status(400).json({
                        result: "email or password does not match"
                    });
                }
            }else{
                // user not found
                res.status(404).json({
                    result:"user not found"
                })
            }
        }else{
            // something is missing
            res.status(400).json({
                result: "user not found kindly found"
            });
        }
    }catch (err){
        // server crashed
        res.status(500).json({
            result: err.message
        });
    }
}

async function forgetPasswordController(req, res){
    try{

        let {email} = req.body;
        // mail
        // new true -> by default -> FindandUpdate -> not updated document,
        // new = true -> your will gwt updated document
        // email -> do we have a user -> no user
        // update
        let user = await FoodUserModel.findOne({email});
        if(user){
            let otp = otpGenerator();
            let afterFiveMinute = Date.now() + 5 * 6 * 1000;
            await mailSender(email, otp);
            user.otp = otp;
            user.otpExpiry = afterFiveMinute;
            await user.save();
            res.status(204).json({
                data: user,
                result: "otp send to your mail"
            })
        }else{
            res.status(404).json({
                result: "user with this email not found"
            })
        }
    }catch(err){
        res.status(500).json(err.message)
    }
}

async function resetPasswordController(req, res){
    try{
        let {otp, password, confirmPassword, email} = req.body;

        let user = await FoodUserModel.findOne({email:email});
        let currentTime = Date.now();
        if(currentTime > user.otpExpiry){
            delete user.otp
            delete user.otpExpiry
            res.status(200).json({
                result:"Otp Expired"
            });
        }else{
            if(user.otp != otp){
                res.status(200).json({
                    result:"wrong OTP"
                })
            }else{
                let user = await FoodUserModel.findOneAndUpdate({otp, email}, {password, confirmPassword}, {runValidators: true, new: true});
                // key delete -> get the document obj -> modify that object by removing useless keys
                delete user.otp
                delete user.otpExpiry

                //save to save this doc in db
                await user.save();
                res.status(201).json({
                    data: user,
                    "message":"password for the use is reset"
                });
            }
        }
        console.log(user);

    }catch(err){
        res.status(500).json({
            result: err.message
        });
    }
}



// **************** Helper function********
function otpGenerator(){
    return Math.floor(100000 + Math.random() * 90000);
}

function protectRoute(req, res, next){
    try{
        const cookies = req.cookies;
        const JWT = cookies.JWT;
        if(cookies.JWT){
            console.log("Protect Route Encountered");
            // you are logged in it will allow next fn to rn
            let token = jwt.verify(JWT, secrets.JWTSECRET);
            console.log(token);
            let userId = token.data;
            req.userId = userId;
            next();
        }else{
            res.send("you are not logged in kindly login.")
        }
    }catch(err){
        if(err.message == "invalid signature"){
            res.send("Token invalid kindly login");
        }else{
            res.send(err.message);
        }
    }
}

module.exports = {
    signUpController,
    loginController,
    forgetPasswordController,
    resetPasswordController,
    protectRoute
}