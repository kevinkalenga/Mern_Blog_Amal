import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
export const signup = async(req, res) => {
   const {username, email, password} = req.body;

   if(!username || !email || !password || username === "" || 
       email === "" || password === "") {
        return res.status(400).json({message: "Tous les champs sont requis"});
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
        res.status(500).json({message: error.message})
     }

}