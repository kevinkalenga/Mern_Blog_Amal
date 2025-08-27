import { Link } from "react-router-dom"
import CallToAction from '../components/CallToAction'
import { useEffect, useState } from "react"
import PostCard from '../components/PostCard'

export default function Home() {
  
  const [posts, setPosts] = useState([])

  useEffect(() => {
     const fetchPosts = async () => {
        const res = await fetch('/api/post/getPosts');
        const data = await res.json();
        setPosts(data.posts)
     }
     fetchPosts()
  })
  
  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
         <h1 className="text-3xl font-bold lg:text-6xl"> Bienvenue sur mon site de blog</h1>
         <p className="text-gray-500 text-xs sm:text-sm">
             Vous trouverez ici une variété d'articles et de tutoriels sur des sujets 
             tels que le développement web, l'ingénierie logicielle et les 
             langages de programmation.
         </p>
         <Link to="/search" className="text-xs sm:text-sm text-teal-500 
         font-bold hover:underline">
            Voir tous les postes 
         </Link>
         <div className="p-3 bg-amber-100 dark:bg-slate-700">
            <CallToAction />
         </div>
         <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
             {
               posts && posts.length > 0 && (
                  <div className="flex flex-col gap-6">
                     <h2 className="text-2xl font-semibold text-center">Postes récents</h2>
                     <div className="flex flex-wrap gap-4 justify-center">
                         {
                           posts.map((post) => (
                             <PostCard key={post._id} post={post} />
                           ))
                         }
                     </div>
                     <Link
                      to={'/search'} 
                      className="text-lg text-teal-500 hover:underline text-center"
                     >
                       Voir tous les postes
                     </Link>
                  </div>
               )
             }
         </div>
      
      </div>
    
    </div>
  )
}
