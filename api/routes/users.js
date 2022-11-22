import express from "express";
import { deleteUser, updateUser, getUser, getUsers } from './../controllers/user.js';
import { verifyToken, verifyUser, verifyAdmin } from './../utils/verifyToken.js';

const router = express.Router();

// //toto proběhne jako 1.
// router.get("/checkauthentication", verifyToken, (req,res,next) =>{
//     res.send("hello user, you are logged in.")
// });

// //toto proběhne jako 2. pomocí next() z 1. kroku
// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//     res.send("hello user, you are logged in and you can delete your account.")
// });

// //toto proběhne jako 3.
// router.get("/checkadmin/:id", verifyAdmin, (req,res,next) =>{
//     res.send("hello admin, you are logged in and you can delete all accounts.")
// });


//Níže přidáme middleware verifikační fce výše abychom provedli verifikaci před vykonáním jednotlivých úkonů jako je update, delete a get

//UPDATE
router.put("/:id", verifyUser, updateUser);
//DELETE
router.delete("/:id", verifyUser, deleteUser);
//GET
router.get("/:id", verifyUser, getUser);
//GET ALL HOTELS
router.get("/", verifyAdmin, getUsers);

export default router;