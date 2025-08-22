import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import {
    Table,
    TableHead,
    TableHeadCell,
    TableBody,
    TableRow,
    TableCell,
    Modal, 
    Button,
    ModalBody, 
    ModalHeader
} from "flowbite-react";

export default function DashComments() {
  
  const {currentUser} = useSelector((state) => state.user)
      const [comments, setComments] = useState([])
        const [showMore, setShowMore] = useState(true)
         const [showModal, setShowModal] = useState(false)
         const [commentIdToDelete, setCommentIdToDelete] = useState('')
      

         useEffect(() => {
            const fetchComments = async () => {
                try {
                    // requette vers l 'api(backend)
                    const res = await fetch('/api/comment/getcomments')
                    // reponse du serveur
                    const data = await res.json()
                    // si c'est ok
                    if(res.ok) {
                      setComments(data.comments);
                      if(data.comments.length < 9) {
                        setShowMore(false)
                      }

                    }
                } catch (error) {
                     console.log(error.message)
                }
            }
            if (currentUser?.isAdmin) {
              fetchComments()
           }
        }, [currentUser._id])
  
    const handleShowMore = async() => {
        const startIndex = comments.length;
        try {
            const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`)
            const data = await res.json();
            if(res.ok) {
                setComments((prev) => [...prev, ...data.comments]);
                if(data.comments.length < 9) {
                    setShowMore(false)
                }
            }
        } catch (error) {
             console.log(error)
        }
    }

    const handleDeleteComment = async () => {
        try {
            const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`, {
                method: 'DELETE',
            })
            const data = await res.json();
            if(res.ok) {
                setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
                setShowModal(false)
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
     }
    
    return (
               <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100
                scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark: scrollbar-thumb-slate-500'>
                   {
                       currentUser.isAdmin && comments.length > 0 ?
                       (
                           <>
                              <Table hoverable className='shadow-md'>
                                   <TableHead>
                                       <TableRow>
                                           <TableHeadCell>Date de mise à jours</TableHeadCell>
                                           <TableHeadCell>Commentaires</TableHeadCell>
                                           <TableHeadCell>Nombre des likes</TableHeadCell>
                                           <TableHeadCell>L'id du post</TableHeadCell>
                                           <TableHeadCell>L'id de l'utilisateur</TableHeadCell>
                                           <TableHeadCell>Supprimer</TableHeadCell>
                                           <TableHeadCell>Supprimer</TableHeadCell>
                                       </TableRow>
                                   </TableHead>
                                   {
                                      comments.map((comment) => (
                                             <TableBody className="divide-y" key={comment._id}>
                                                                               <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                                                  <TableCell>
                                                                                    {new Date(comment.updatedAt).toLocaleDateString()}
                                                                                  </TableCell>
                                                                                  <TableCell>
                                                                                    {comment.content}
                                                                                  </TableCell>
                                                                                  <TableCell>
                                                                                     {comment.numberOfLikes}
                                                                                  </TableCell>
                                                                                  <TableCell>
                                                                                     {comment.postId}
                                                                                  </TableCell>
                                                                                  <TableCell>
                                                                                     {comment.userId}
                                                                                  </TableCell>
                                                                                 
                                                                                    <TableCell>
                                                                                   
                                                                                       <span 
                                                                                       onClick={() => {
                                                                                             setShowModal(true);
                                                                                              setCommentIdToDelete(comment._id)
                                                                                       }
                                                                                            
                                                                                           } 
                                                                                           className='font-medium text-red-500 hover:underline cursor-pointer'>
                                                                                            Supprimer
                                                                                        </span>
                                                                                     
                                                                                  </TableCell>
                                                                                   
                                                                               </TableRow>
                                                                            </TableBody>
                                      ))
                                   }
                                   
                              </Table>
                                {
                                   showMore && (
                                       <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
                                           Affiche +
                                       </button>
                                   )
                                }
                           </>
                       ):(
                           <div>Users not found</div>
                       )
                   }
       
       
                   <Modal
                                               show={showModal}
                                               onClose={() => setShowModal(false)}
                                               popup
                                               size="md"
                                           >
                                               <ModalHeader />
                                               <ModalBody>
                                                   <div className="text-center">
                                                       <HiOutlineExclamationCircle
                                                           className="h-14 w-14 text-red-400
                                                 dark:text-gray-200 mb-4 mx-auto"
                                                       />
                                                       <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                                                           Vous etes sur de supprimer ce commentaire ?
                                                       </h3>
                                                       <div className="flex justify-center gap-4">
                                                           <Button color="danger" onClick={handleDeleteComment}>
                                                               oui , je suis sur
                                                           </Button>
                                                           <Button
                                                               color="gray"
                                                               onClick={() => setShowModal(false)}
                                                           >
                                                               No, j'annule
                                                           </Button>
                                                       </div>
                                                   </div>
                                               </ModalBody>
                                     </Modal>
       
               </div>
    )
}
