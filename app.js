require('dotenv').config();
const express=require("express");

const app=express();

const userRouter=require("./api/users/user.router")

app.use(express.json())

app.use("/api/users",userRouter)


// console.log(process.env.APP_PORT)
app.listen(process.env.APP_PORT,()=>{
    console.log(`server is running:${process.env.APP_PORT}`)
})