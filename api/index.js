import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
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

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);


//pomocí next() se nasměřujeme do další middleware route
//err - díky tomu podchytíme jakékoliv errory v index.js a všech routes uvnitř index.js => globálně handlujeme errory
app.use((err,req,res,next) =>{
    //err získáváme z předchozí middleware fce uvnitř route
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong.";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});

app.get("/", (req,res) => {
res.send("hello first request");
});

app.listen(8800, () =>{
    connect();
    console.log("Connected to backend.");
})
