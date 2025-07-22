import bcryptjs from 'bcryptjs';
import {errorHandler} from '../utils/errors.js';
import User from '../models/user.model.js'

export const test = (req, res) => {
    res.json({message: "Api valide"})
}

export const updateUser = async (req, res, next) => {
    console.log(req.body)
    if(req.user.id !== req.params.userId) {
        return next(errorHandler(403, "Tu n'as pas l'autorisation de faire la mise à jour" ))
    }
    if(req.body.password) {
        if(req.body.password.length < 6) {
            return next(errorHandler(400, 'Le mot de passe doit contenir au moins 6 caractères'))
        }
         req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }
    if(req.body.username) {
        if(req.body.username.length < 7 || req.body.username.length > 20) {
            return next(errorHandler(400, "Le nom de l'utilisateur doit contenir moins de 20 caractères"))
        }
        
    }
    if(req.body.username.includes(' ')) {
          return next(errorHandler(400, "Le nom de l'utilisateur ne doit pas contenir des espaces"))
        
    }
    if(req.body.username !== req.body.username.toLowerCase()) {
          return next(errorHandler(400, "Le nom de l'utilisateur doit etre en minuscules "))
        
    }
    if(!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
          return next(errorHandler(400, "Le nom de l'utilisateur doit contenir des lettres et des chiffres"))
        
    }

    try {
        const updateUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password,
            }
        }, 
        {new: true}
    )
    const {password, ...rest} = updateUser._doc;
    res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
   
}

export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.userId) {
        return next(errorHandler(403, "Les données incorrecte"))
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json("L'utilisateur a été supprimé")
    } catch (error) {
         next(error)
    }
}

