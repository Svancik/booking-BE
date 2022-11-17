import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();

//fci níže zavoláme pokaždé když se budeme chtít připojit na BE server
const connect = async () =>{
try{
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB");
} catch (err){
    throw(err);
}
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected!")
});

mongoose.connection.on("connected", ()=>{
    console.log("mongoDB connected!")
});


app.get("/", (req,res) => {
res.send("hello first request");
});

app.listen(8800, () =>{
    connect();
    console.log("Connected to backend.");
})
