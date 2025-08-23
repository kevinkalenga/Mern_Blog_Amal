import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiAnnotation,HiArrowNarrowUp,HiDocumentText,HiOutlineUserGroup } from "react-icons/hi";
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
import { Link } from "react-router-dom";


export default function DashboardComponent() {
  
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const {currentUser} = useSelector((state) => state.user)
  
  
  useEffect(() => {

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/user/getUsers?limit=5')
            const data = await res.json()
            if(res.ok) {
                setUsers(data.users);
                setTotalUsers(data.totalUsers)
                setLastMonthUsers(data.lastMonthUsers)
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/post/getPosts?limit=5')
            const data = await res.json()
            if(res.ok) {
                setPosts(data.Posts);
                setTotalPosts(data.totalPosts)
                setLastMonthPosts(data.lastMonthPosts)
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const fetchComments = async () => {
        try {
            const res = await fetch('/api/comment/getComments?limit=5')
            const data = await res.json()
            if(res.ok) {
                setComments(data.Comments);
                setTotalComments(data.totalComments)
                setLastMonthComments(data.lastMonthComments)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    if(currentUser.isAdmin) {
        fetchUsers()
        fetchPosts()
        fetchComments()
    }
  }, [currentUser])


  return (
    <div className="p-3 md:mx-auto">
         <div className="flex-wrap flex gap-4 justify-center">
            <div className="flex flex-col p-3 dark:bg-slate-800
              gap-4 md:w-72 w-full rounded-md shadow-md">
                <div className="flex justify-between">
                    <div className="">
                        <h3 class="text-gray-500 text-md uppercase">Les utilisateurs</h3>
                        <p className="text-2xl">{totalUsers}</p>
                    </div>
                    <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />

                </div>
                <div className="flex gap-2 text-sm">
                   <span className="text-green-500 flex items-center">
                     <HiArrowNarrowUp />
                     {lastMonthUsers}
                   </span>
                   <div className="text-gray-500">Mois dernier</div>
                </div>
            </div>
            <div className="flex flex-col p-3 dark:bg-slate-800
             gap-4 md:w-72 w-full rounded-md shadow-md">
                 <div className="flex justify-between">
                    <div className="">
                         <h3 class="text-gray-500 text-md uppercase">Les commentaires</h3>
                          <p className="text-2xl">{totalComments}</p>
                    </div>
                    <HiAnnotation className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg" />
                 </div>
                 <div className="flex gap-2 text-sm">
                    <span className="text-green-500 flex items-center">
                        <HiArrowNarrowUp />
                        {lastMonthComments}
                    </span>
                    <div className="text-gray-500">Mois dernier</div>
                 </div>
            </div>
            <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
                <div className="flex justify-between">
                    <div className="">
                         <h3 class="text-gray-500 text-md uppercase">Les postes</h3>
                          <p className="text-2xl">{totalPosts}</p>
                    </div>
                    <HiDocumentText className="bg-lime-600 text-white rounded-3xl text-5xl p-3 shadow-lg" />
                </div>
                <div className="flex gap-2 text-sm">
                    <span className="text-green-500 flex items-center">
                        <HiArrowNarrowUp />
                        {lastMonthPosts}
                    </span>
                    <div className="text-gray-500">Mois dernier</div>
                </div>
            </div>
        </div>
        <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
            <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                <div className="flex justify-between p-3 text-sm font-semibold">
                   <h1 className="p-2 text-center">Les utilisateurs recents</h1>
                   <button className="p-2 bg-secondary">
                     <Link to={'/dashboard?tab=users'}>Tout voir</Link>
                   </button>
                </div>
                 <Table hoverable>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>Image</TableHeadCell>
                            <TableHeadCell>Nom</TableHeadCell>
                        </TableRow>
                    </TableHead>
                       {
                        users && 
                        users.map((user) => (
                            <TableBody key={user._id} className="divide-y">
                                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                     <TableCell>
                                        <img src={user.profilePicture} alt="user" className="w-10 h-10 rounded-full bg-gray-500" />
                                     </TableCell>
                                     <TableCell>
                                        {user.username}
                                     </TableCell>
                                </TableRow>

                            </TableBody>
                        ))
                       }
             </Table>

            </div>
            <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                <div className="flex justify-between p-3 text-sm font-semibold">
                   <h1 className="p-2 text-center">Les commentaires recents</h1>
                   <button className="p-2 bg-secondary">
                     <Link to={'/dashboard?tab=comments'}>Tout voir</Link>
                   </button>
                </div>
                 <Table hoverable>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>Commentaires</TableHeadCell>
                            <TableHeadCell>Likes</TableHeadCell>
                        </TableRow>
                    </TableHead>
                       {
                        comments && 
                        comments.map((comment) => (
                            <TableBody key={comment._id} className="divide-y">
                                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                     <TableCell className="w-96">
                                        {comment.content}
                                     </TableCell>
                                     <TableCell>
                                        {comment.numberOfLikes}
                                     </TableCell>
                                </TableRow>

                            </TableBody>
                        ))
                       }
             </Table>

            </div>
            <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                <div className="flex justify-between p-3 text-sm font-semibold">
                   <h1 className="p-2 text-center">Les postes récents</h1>
                   <button className="p-2 bg-secondary">
                     <Link to={'/dashboard?tab=posts'}>Tout voir</Link>
                   </button>
                </div>
                 <Table hoverable>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>Image</TableHeadCell>
                            <TableHeadCell>Titre</TableHeadCell>
                            <TableHeadCell>Categorie</TableHeadCell>
                        </TableRow>
                    </TableHead>
                       {
                        posts && 
                        posts.map((post) => (
                            <TableBody key={post._id} className="divide-y">
                                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                     <TableCell>
                                        <img src={post.image} alt="user" className="w-14 h-10 rounded-md bg-gray-500" />
                                     </TableCell>
                                     <TableCell className="w-96">
                                        {post.title}
                                     </TableCell>
                                     <TableCell className="w-5">
                                        {post.category}
                                     </TableCell>
                                </TableRow>

                            </TableBody>
                        ))
                       }
             </Table>

            </div>
            
        </div> 
    </div>
  )
}
