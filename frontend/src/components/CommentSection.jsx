import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert, Button, Textarea } from "flowbite-react";
import { useState, useEffect } from "react";
import Comment from "./Comment";

export default function CommentSection({postId}) {
    const {currentUser} = useSelector((state) => state.user);
    const [commentError, setCommentError] = useState(null)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])

    const handleSubmit= async (e) => {
       e.preveDefault()
       if(comment.length > 200) {
           return
       }

       try {
          const res = await fetch('/api/comment/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({content:comment, postId, userId:currentUser._id})
          })
          const data = await res.json();
          if(res.ok) {
            setComment('')
            setCommentError(null)
            setComments([data, ...comments])
          }
       } catch (error) {
         setCommentError(error.message)
       }
    }

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`/api/comment/getPostComments/${postId}`)
                if(res.ok) {
                    const data = await res.json()
                    setComments(data)
                }
            } catch (error) {
                 console.log(error.message)
            }
        }
        getComments()
    }, [postId])
    
    
    return(
        <div className="max-w-2xl mx-auto w-full p-3">
            {
                currentUser ? 
                 (
                    <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
                           <p>Connecté en tant que : </p>
                           <img className="h-5 w-5 object-cover rounded-full" src={currentUser.profilePicture} alt="image" />
                           <Link to={'/dashboard?tab=profile'} className="text-xs text-cyan-600 hover:underline">
                              @{currentUser.username}
                           </Link>
                    </div>
                 ):
                 (
                    <div className="text-sm text-teal-500 my-5 flex gap-1">
                        Connectez-vous avant de commenter
                        <Link className="text-blue-500 hover:underline" to={'/sign-in'}>
                             Connectez-vous
                        </Link>
                    </div>
                 )
            }
            {
                currentUser && (
                    <form onSubmit={handleSubmit} className="border border-teal-500 rounded-md p-3">
                          <Textarea 
                             placeholder="Ajoute un commentaire..."
                             rows='3'
                             maxLength='200'
                             onChange={(e) => setComment(e.target.value)}
                             value={comment}
                          />
                          <div className="flex justify-between items-center mt-5 text-xs">
                               <Button outline gradientDuoTone='purpleToBlue' type="submit">
                                  Valider
                               </Button>
                          </div>
                          {
                            commentError && (
                                <Alert color="failure" className="mt-5">
                                    {commentError}
                                </Alert>
                            )
                          }
                    </form>
                )
            }
            {
                comments.length === 0 ? (
                   <p>Aucun commentaire a été mentionné</p>
                ):(
                  <>
                    <div className="text-sm my-5 flex items-center gap-1">
                        <p>Commentaires</p>
                        <div className="border border-gray-400 py-1 px-2 rounded-sm">
                            {comments.length}
                        </div>
                    </div>
                    {
                        comments.map((comment) => (
                            <Comment 
                               key={comment._id}
                               comment={comment}
                            />
                        ))
                    }
                  </>
                )
            }
        </div>
    )
}