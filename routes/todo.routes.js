const {Router} = require("express");
const {authenticate} = require("../middleware/authentacation");
const { Todomodel } = require("../model/todo.model");
const todoRouter = Router();


todoRouter.get("/", authenticate,async(req,res)=>{
    const query = req.query;
    

    if(query.status && query.tag){
        const todos = await Todomodel.find({ownerID:req.body.ownerID,status:query.status,tag:query.tag})
        if(todos){
            res.send({alltodos:todos})
            }
            else{
               res.send({msg:"No todo found"})
            }
    }
    else if(query.status && !query.tag){
        const todos = await Todomodel.find({ownerID:req.body.ownerID,status:query.status})
        if(todos){
            res.send({alltodos:todos})
            }
            else{
               res.send({msg:"No todo found"})
            }
    }
    else if(!query.status && query.tag){
        const todos = await Todomodel.find({ownerID:req.body.ownerID,tag:query.tag})
        if(todos){
            res.send({alltodos:todos})
            }
            else{
               res.send({msg:"No todo found"})
            }
    }
    else {
        const todos = await Todomodel.find({ownerID:req.body.ownerID})
        if(todos){
            res.send({alltodos:todos})
            }
            else{
               res.send({msg:"No todo found"})
            }
    }
     
    
})


todoRouter.post("/create", authenticate, async(req,res)=>{

   const {taskname, status, tag, ownerID }  = req.body
    
    const todo = new Todomodel({
        taskname,
        status,
        tag,
        ownerID
    })

    try {
        await todo.save();
        res.send({msg:"Todo added successfully"})
    } catch (error) {
        res.send({err:error.message})
    }
})

todoRouter.patch("/update/:id",authenticate,async(req,res)=>{
      const {id} = req.params;
      const updateTodo = await Todomodel.findOneAndUpdate({_id:id,ownerID:req.body.ownerID},{...req.body});
      if(updateTodo){
        res.send({msg:"update Successful"})
      }
      else{
        res.send({msg:"Something went wrong"})
      }
})

todoRouter.delete("/delete/:id",authenticate,async(req,res)=>{
    const {id} = req.params;
    const deleteTodo = await Todomodel.findOneAndDelete({_id:id,ownerID:req.body.ownerID});
    if(deleteTodo){
      res.send({msg:"deleted Successfully"})
    }
    else{
      res.send({msg:"Something went wrong"})
    }
})







module.exports ={todoRouter}