//tech knowledge
// (schema) -> set of features and rules a certain entitiy should
// follow
// how to create adb -> link show
// connect to my app mongoose

const mongoose = require('mongoose');
let secrets = require("../secrets"); 
mongoose
    .connect(secrets.DB_LINK)
    .then(function () {
        console.log("connected");
    })
    .catch(function(err){
        console.log("error", err);
    })

// how to create a Schema -> only entries will be added to your db on one else
let userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Name is not send"]
    },
    password:{
        type: String,
        require: [true, "password is missing"]
    },
    confirmPassword:{
        type: String,
        require: [true, "confirmPassword is missing"],
        // custom validate
        validate:{
            validator: function(){
                // this refers to the current entry
                return this.password == this.confirmPassword;
            },
            // error message
            message: "password not match"
        }
    },
    email: {
        type: String,
        require: [true, "email is missing"],
        unique: true
    },
    phonenumber:{
        type: "String",
        minLength: [10, "less than 10 number"],
        maxLength: 10
    },
    pic:{
        type: String,
        default: "p1.JPG"
    }, 
    otp:{
        type: String
    },
    otpExpiry:{
        type: Date
    },
    address:{
        type: String
    }
});

const UserModel = mongoose.model('FooduserModel', userSchema);
module.exports = UserModel;




