import { Link } from "react-router-dom";
import { Label, TextInput, Button } from 'flowbite-react';

export default function SignUp() {
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
          <form className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md">
            <div>
              <Label value="Votre nom" />
              <TextInput type="text" placeholder="Votre nom" id="username" />
            </div>
            <div>
              <Label value="Votre email" />
              <TextInput type="email" placeholder="name@company.com" id="email" />
            </div>
            <div>
              <Label value="Votre mot de passe" />
              <TextInput type="password" placeholder="Mot de passe" id="password" />
            </div>

            {/* ✅ Le bouton dans une div stylée */}
             <div className="bg-white p-4 rounded-md shadow-md">
                     <Button color="blue" type="submit">
                          Connectez-vous
                      </Button>
             </div>

          </form>

          <div className="flex gap-2 mt-5 text-sm">
            <span>Avez-vous un compte?</span>
            <Link to="/sign-in" className="text-blue-500">
              Connectez-vous
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


