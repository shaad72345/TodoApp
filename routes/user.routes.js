const {Router} = require("express");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require("dotenv").config();

const { Usermodel } = require("../model/user.model");
// var get_ip = require('ipware')().get_ip;

const userRouter = Router();


userRouter.get("/",(req,res)=>{
    res.send("UserPage")
})

userRouter.post("/signup", async(req,res)=>{
    // var ip_info = get_ip(req);
    // console.log(ip_info)
    const {name,email,password}  = req.body;
    const hash = bcrypt.hashSync(password, 5);
    console.log(req.body)
    const user = new Usermodel({
        name,
        email,
        password:hash
    })
    try {
        await user.save();
        res.send({msg:"Signup successful"})
    } catch (error) {
        res.send({msg:error.message})
    }
})


userRouter.post("/login", async(req,res)=>{
  const  {email, password} = req.body;
  const user = await Usermodel.findOne({email});
  const hash = user?.password
  if(bcrypt.compareSync(password, hash)){
    const userId = user._id;
    var token = jwt.sign({ ownerID:userId }, process.env.JWT_SECRET);         //JWT_SECRET
   return res.send({msg:"login successful", token:token})
  }
  else{

     return res.send({msg:"Invalid Credential"})
  }

  


})





module.exports ={userRouter}