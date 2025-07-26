import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from 'react';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import {useNavigate} from 'react-router-dom'

// elements importés depuis dashProfile
import {getStorage, ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {app} from '../firebase'

export default function CreatePost() {
    const navigate = useNavigate()
     const [content, setContent] = useState('');
     const [file, setFile] = useState(null);
     const [imageUploadProgress, setImageUploadProgress] = useState(null)
     const [imageUploadError, setImageUploadError] = useState(null)
     const [publishError, setPublishError] = useState(null)
     const [formData, setFormData] = useState({});

      const handleUploadImage = async () => {
            try {
                   if(!file) {
                      setImageUploadError("Selectionner une image svp");
                        return;
                    }
                     setImageUploadError(null);
                       
                       const storage = getStorage(app)
                       const fileName = new Date().getTime() + '-' + file.name;
                       const storageRef = ref(storage, fileName)
                       const uploadTask = uploadBytesResumable(storageRef, file);

                       uploadTask.on(
                            'state_changed',
                            (snapshot) => {
                             const progress = 
                             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                             setImageUploadProgress(progress.toFixed(0));
                            },

                             (error) => {
                                setImageUploadError('Echec du télechargement')
                                setImageUploadProgress(null)
                            },
                            () => {
                                      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                       setImageUploadProgress(null);
                                       setImageUploadError(null)
                                       setFormData({...formData, image: downloadURL})
                                      })
                                }
                            
                       )

            } catch (error) {
                setImageUploadError('Le téchargement a echoué')
                setImageUploadProgress(null)
                console.log(error)
            }
      }

      const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(formData),
            })
            const data = await res.json()
            if(!res.ok) {
                setPublishError(data.message)
                return
            }
            if(res.ok) {
                setPublishError(null);
                navigate(`/post/${data.slug}`)
            }
        } catch (error) {
            setPublishError('Une erreur est survenue')
            console.log(error)
        }
      }

    
    return (
        <div className="min-h-screen p-3 mx-auto max-w-3xl">
            <h1 className="text-center text-3xl my-7">Créer un article</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                     <TextInput type="text" placeholder="Titre" 
                       required id='title' className="flex-1"
                       onChange={(e) =>setFormData({...formData, title:e.target.value})}
                     />
                     <Select
                        onChange={(e) =>setFormData({...formData, category:e.target.value})}
                     >
                        <option value="uncategorized">Selectionner une categorie</option>
                        <option value="javascript">Javascript</option>
                        <option value="reactjs">React.js</option>
                        <option value="nextjs">Next.js</option>
                     </Select>
                </div>
                <div className="flex gap-4 items-center 
                    justify-between border-4 border-teal-500 border-dotted p-3">
                    <FileInput type='file' accept="image/*" 
                    onChange={(e)=>setFile(e.target.files[0])}
                    />
                     <Button onClick={handleUploadImage} disabled={imageUploadProgress} color="blue" type="button">
                          
                        {
                            imageUploadProgress ? (
                                 <div className="w-16 h-16">
                                    <CircularProgressbar 
                                       value={imageUploadProgress}
                                       text={`${imageUploadProgress || 0}%`}
                                    />
                                 </div>
                            ):(
                              "Telecharger l'image "   
                            )
                        }
                      
                      </Button>
                
                </div>
                {
                    imageUploadError && (
                        <Alert color="failure">
                            {imageUploadError}
                        </Alert>
                    )
                }
                {
                    formData.image && (
                        <img src={formData.image} alt="upload" className="w-full h-72 object-cover" />
                    )
                }
         
                
                 {/* <ReactQuill
                     theme="snow"
                      value={content}
                      onChange={setContent}
                     placeholder="Écris quelque chose..."
                     className="h-72 mb-12"
                      
                      
                /> */}
                  <ReactQuill
                     theme="snow"
                     value={formData.content}
                     onChange={(value) =>
                       setFormData((prev) => ({
                         ...prev,
                         content: value,
                       }))
                     }
                     placeholder="Écris quelque chose..."
                     className="h-72 mb-12"
                />


                  <Button color="blue" type="submit">
                          Publier
                  </Button>
                  {
                    publishError && <Alert className="mt-5" color="failure">{publishError}</Alert>
                  }
            </form>
        </div>
    )
}



