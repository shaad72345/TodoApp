const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    taskname :{type:String, required:true},
    status:{type:String,required:true, enum:["pending", "done"], default:"pending"},
    tag:{type:String, requires:true,enum:["personal","official","family"]},
    ownerID:{type:String, required:true}
})



const Todomodel = mongoose.model("todo", todoSchema);

module.exports = {Todomodel}
