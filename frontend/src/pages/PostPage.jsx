import { useEffect, useState } from "react"
import {Link, useParams} from 'react-router-dom'
import { Spinner, Button } from "flowbite-react"


export default function PostPage() {
    
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const {postSlug} = useParams()
    
    useEffect(() => {
        const fetchPost = async () => {
            try {
                   setLoading(true)
                   const res = await fetch(`/api/post/getposts?slug=${postSlug}`)
                   const data = await res.json();

                   if(!res.ok) {
                     setError(true)
                     setLoading(false)
                   }

                   if(res.ok) {
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false)
                   }
            } catch (error) {
                setError(true)
                setLoading(false)
                console.log(error)
            }
        }
        fetchPost()
    }, [postSlug])

    if(loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <Spinner size="xl" />
        </div>
    )
    
    
    return(
        <main className="min-h-screen p-3 flex flex-col max-w-6xl mx-auto">
            <h1 className="text-3xl mt-10 p-3 text-center 
            font-serif max-w-2xl mx-auto lg:text-4xl">
                 {post && post.title}
            </h1>
            <Link className="self-center mt-5" to={`/search?category=${post && post.category}`}>
               <Button color='gray' pill size="xs">
                  {
                    post && post.category
                  }
               </Button>
            </Link>
            <img className="mt-10 p-3 max-h-[500px] w-full object-cover"
               src={post && post.image} alt={post && post.title} 
            />
            <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
               <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
               <span>{post && (post.content.length/1000).toFixed(0)} mins read</span>
            </div>
            <div className="p-3 mx-auto max-w-2xl w-full post-content
                      dangerouslySetInnerHMTL={{_html:post && post.content}}">

            </div>
        </main>
    )
}