import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

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

//middlewares
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/auth", roomsRoute);


app.get("/", (req,res) => {
res.send("hello first request");
});

app.listen(8800, () =>{
    connect();
    console.log("Connected to backend.");
})
