const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
// const secrets = require("./secrets");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const planRouter = require("./routes/planRouters")
const cookieParse = require("cookie-parser");
// represent -> collections
const FoodUserModel = require("./model/usermodle");


app.use(express.json()); 

// add cookies to req.cookies
app.use(cookieParse())


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/plan", planRouter);
//singup
// input:-
    //name
    //password
    //confirm password
    //address
    //email
    //phonenumber
    //pic 
    
app.listen(3000, function(){
    console.log("server started at port 3000");
})













// // **************** Helper function********
// function otpGenerator(){
//     return Math.floor(100000 + Math.random() * 90000);
// }

// function protectRoute(req, res, next){
//     try{
//         const cookies = req.cookies;
//         const JWT = cookies.JWT;
//         if(cookies.JWT){
//             console.log("Protect Route Encountered");
//             // you are logged in it will allow next fn to rn
//             let token = jwt.verify(JWT, secrets.JWTSECRET);
//             console.log(token);
//             let userId = token.data;
//             req.userId = userId;
//             next();
//         }else{
//             res.send("you are not logged in kindly login.")
//         }
//     }catch(err){
//         if(err.message == "invalid signature"){
//             res.send("Token invalid kindly login");
//         }else{
//             res.send(err.message);
//         }
//     }
// }


// {
//     name: 'Suraj12',
//     password: 'efgh',
//     confirmPassword: 'efgh',
//     email: 'abcd@gmail.com',
//     phonenumber: '8800897037',
//     pic: 'p1.JPG',
// -> unique id
//     _id: new ObjectId("63176556ca44dcf812db7d3a"),
//     __v: 0
//   }