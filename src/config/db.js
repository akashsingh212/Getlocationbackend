
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
   
module.exports = () =>{
   return mongoose.connect("mongodb+srv://getlocation:wKuh4Oc4EvWbHLyT@cluster0.hadwvj3.mongodb.net/?retryWrites=true&w=majority")
}