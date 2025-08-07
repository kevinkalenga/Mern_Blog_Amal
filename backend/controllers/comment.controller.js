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



