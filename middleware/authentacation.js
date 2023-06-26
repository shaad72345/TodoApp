var jwt = require('jsonwebtoken');
require("dotenv").config();
const authenticate = (req,res,next)=>{

    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
       return res.send({msg:"Please login again"})
    }

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if(err){
          return  res.send({msg:"You are not authorized"})
        }
        if(decoded){
            req.body.ownerID = decoded.ownerID
            console.log(req.body)
            next();
        }
    });

}

module.exports ={authenticate}