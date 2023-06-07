const mongoose = require("mongoose");

const Usermodle = new mongoose.Schema({
    coordinates : {type:Array},
    fullName : {type: String, required : true},
    email : { type: String},
    password : {type: String, required : true},
    number: {type: Number, required : true},
    category: {type: String},
    vehicleNo:{type: String},
    type : {type:String, required: true}
},{
    versionKey: false,
    timestamps: true
})

const Data = mongoose.model('users',Usermodle);
module.exports = Data;