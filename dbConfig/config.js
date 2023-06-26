const mongoose = require("mongoose");

//const connection = mongoose.connect("mongodb://localhost:27017/TodoEval");

const connection = mongoose.connect("mongodb+srv://shaad72345:Todo12345@clustertodo.oulb973.mongodb.net/?retryWrites=true&w=majority");
module.exports ={connection};