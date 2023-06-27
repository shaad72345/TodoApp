const express = require("express");
var cors = require('cors');
const {connection} = require("./dbConfig/config")
const {todoRouter} = require("./routes/todo.routes");
const{userRouter}= require("./routes/user.routes")
const app = express();

app.use(cors());
app.use(express.json())

app.get("/", (req,res)=>{
res.send("Home")
})


app.use("/user",userRouter);
app.use("/todo", todoRouter)


const PORT = 8000;

app.listen(PORT, async()=>{
    await connection;
    console.log("db is connected");
    console.log(`Listening on port ${PORT}`);
})