import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connexion reussie")
}).catch((err) => {
    console.log(err)
})




const app = express()
app.listen(3000, () => {
    console.log("serveur ok sur le port 3000")
})