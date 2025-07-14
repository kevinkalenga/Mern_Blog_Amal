import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Alert, Label, TextInput, Spinner, Button } from 'flowbite-react';
import { useDispatch, useSelector } from "react-redux";
import { signInstart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import AOuth from '../components/OAuth'


export default function SignUp() {
  // show password
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email:"",
    password:""
  })
  const {email, password} = formData
  const {loading, error:errorMessage} = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleChange = (e) => {
     setFormData({
       ...formData,
       [e.target.id]:e.target.value.trim()
     })
  }

  

  const handleSubmit = async(e) => {
     e.preventDefault()
     if(!formData.email || !formData.password) {
        return dispatch(signInFailure('Tous les champs sont requis'))
     }

     try {
       dispatch(signInstart())
       const res = await fetch('/api/auth/signin', {
         method: 'POST',
         headers: {
          'Content-Type': 'application/json'
         },
         body: JSON.stringify(formData)
       })
       const data = await res.json(); 
       if(data.success === false) {
         return dispatch(signInFailure(data.message))
       }
      
       if(res.ok) {
        dispatch(signInSuccess(data))
         navigate('/')
       }
     } catch (error) {
       dispatch(signInFailure(error.message))
     }

  }

 
  
  return (
    <div className="min-h-screen mt-20 bg-gray-100">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-5 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Blog
            </span>
            Web
          </Link>
          <p className="text-sm mt-5">
            Ceci est un projet de démonstration.
            Vous pouvez vous inscrire avec votre adresse e-mail et
            votre mot de passe ou via Google.
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4
             bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
            
            <div>
              <Label value="Votre email" />
              <TextInput type="email"
                 placeholder="name@company.com" 
                 value={email}
                 id="email" 
                 onChange={handleChange} 
                 />
            </div>
            <div className="relative">
              <Label value="Votre mot de passe" />
              <TextInput type={showPassword ? "text":"password"} placeholder="*******" id="password" onChange={handleChange}
              value={password} 
              />
              {
                showPassword ? (
                  <AiFillEyeInvisible className="absolute right-3 bottom-3 text-xl cursor-pointer"
                   onClick={()=>setShowPassword((prevState)=>!prevState)} 
                  />
                ):(
                  <AiFillEye className="absolute right-3 bottom-3 text-xl cursor-pointer"
                    onClick={()=>setShowPassword((prevState)=>!prevState)} 
                  />
                )
              }
            </div>

            {/* ✅ Le bouton dans une div stylée */}
             <div className="bg-white p-4 rounded-md shadow-md">
                     <Button color="blue" type="submit" disabled={loading}>
                          {
                            loading ? (
                              <>
                                <Spinner size="sm" />
                                <span className="pl-3">Loading...</span>
                              </>
                            ): (
                              "Connexion"
                            )
                          }
                      </Button>
                      <AOuth />
             </div>

          </form>

          <div className="flex gap-2 mt-5 text-sm">
            <span>Vous n'avez pas un compte?</span>
            <Link to="/sign-up" className="text-blue-500">
              Inscription
            </Link>
          </div>
           {
            errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )
           }
        </div>
      </div>
    </div>
  );
}



