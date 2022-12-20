const mongoose = require('mongoose');
let planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Kindly pass the name"],
        maxLength: [40, "Your plan length more than 40 character"]
    },
    duration:{
        type: Number,
        required: [true, "You need to provide duration"]
    },
    price:{
        type: Number,
        required:true 
    },
    discount:{
        type:Number,
        validate:{
            validator:function(){
                return this.discount < this.price;
            },
            message: "Discount must be less then actual price"
        },
    },

})
const FoodplanModel = mongoose.model('FoodplanModel', planSchema);
module.exports = FoodplanModel;