import {errorHandler} from '../utils/errors.js'
import Comment from '../models/comment.model.js'


export const createComment = async (req, res, next) => {
    try {
         const {content, postId, userId} = req.body;
         if(userId !== req.user.id) {
            return next(errorHandler(403, "Vous n'avez pas l'autorisation de commenter"))
         }
         const newComment = new Comment({
            content,
            postId,
            userId
         })
         await newComment.save();
         res.status(200).json(newComment)
    } catch (error) {
        next(error)
    }
}

// fonction permettant de recup les postes commentés
export const getPostComments = async (req, res, next) => {
   try {
      const comments = await Comment.find({postId:req.params.postId}).sort({
        createdAt: -1
      });
      res.status(200).json(comments)
   } catch (error) {
    next(error)
   }
}

export const likeComment = async (req, res, next) => {
   try {
      // recup d'un comment à prtir de  l id
      const comment = await Comment.findById(req.params.commentId)
      // sI le comment n existe ps
      if(!comment) {
         return next(errorHandler(404, 'Commentaire non trouvé'))
      }
      // recup de l'index de user qui a liké le post
      const userIndex = comment.likes.indexOf(req.user.id)
      if(userIndex === -1) {
         comment.numberOfLikes += 1
         comment.likes.push(req.user.id)
      } else {
         comment.numberOfLikes -= 1
          comment.likes.splice(userIndex, 1)
      }

      await comment.save();
      res.status(200).json(comment)

   } catch (error) {
      next(error)
   }
}

 export const editComment = async (req, res, next) => {
     try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment) {
         return next(errorHandler(404, "Vous n'etes pas permis d'editer ce comentaire"))
        }
        const editedComment = await Comment.findByIdAndUpdate(
             req.params.commentId, 
             {content:req.body.comment},
             {new: true}
            )
            res.status(200).json(editedComment)
     } catch (error) {
        next(error)
     }
 }
 export const deleteComment = async (req, res, next) => {
     try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment) {
         return next(errorHandler(404, "Commentaire non trouvé"))
        }
        
        if(comment.userId !== req.user.id && !req.user.isAdmin) {
          return next(errorHandler(403, "Vous n'etes pas permis de supprimer ce commentaire"))
        }
        
        
         await Comment.findByIdAndDelete(req.params.commentId)
            res.status(200).json('Le commentaire a été supprimé')
     } catch (error) {
        next(error)
     }
 }

 export const getComments = async (req, res, next) => {
    if(!req.user.isAdmin) {
      return next(errorHandler(403, "Vous n'etes pas permis de recevoir les commentaires" ))
    } 

    try {
       const startIndex = parseInt(req.query.startIndex) || 0;
       const limit = parseInt(req.query.limit) || 9;
       const sortDirection = req.query.sort === 'desc' ? -1:1 
       const comments = await Comment.find()
                       .sort({createdAt:sortDirection})
                       .skip(startIndex)
                       .limit(limit)
                     //   tous les commentaires
                       const totalComments = await Comment.countDocuments();
                     //   la date actelle
                       const now = new Date()
                     // recup de l'année, mois, date 
                       const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
                     //   tenir compte de last comment
                       const lastMonthComments = await Comment.countDocuments({createdAt: {$gte: oneMonthAgo}})
                       res.status(200).json({comments, totalComments, lastMonthComments})
    } catch (error) {
      next(error)
    }
 }



