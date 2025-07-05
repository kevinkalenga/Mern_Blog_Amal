import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/errors.js';
export const signup = async(req, res, next) => {
   const {username, email, password} = req.body;

   if(!username || !email || !password || username === "" || 
       email === "" || password === "") {
       next(errorHandler(400, "Tous les champs sont requis"))
    }

    // S il n'y a pas de message d erreur je vais hasher le mdp
     const hashedPassword = bcryptjs.hashSync(password, 10)


     const newUser = new User({
        username,
        email,
        password:hashedPassword
     })

     try {
        await newUser.save()
        res.json('Inscription reussie')
     } catch (error) {
        next(error)
     }

}