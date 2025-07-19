// import {
//     Navbar,
//     TextInput,
//     Button,
//     NavbarLink,
//     NavbarCollapse,
//     NavbarToggle,
// } from "flowbite-react";
// import { Link, useLocation } from "react-router-dom";
// import { AiOutlineSearch } from "react-icons/ai";
// import { FaMoon } from "react-icons/fa";

// export default function Header() {
//     const path = useLocation().pathname;
//     console.log(path);

//     return (
//         <Navbar className="border-b-2">
//             <Link
//                 to="/"
//                 className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold
//                 dark:text-white"
//             >
//                 <span
//                     className="px-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg
//                  text-white"
//                 >
//                     Blog
//                 </span>
//                 Web
//             </Link>
//             <form>
//                 <TextInput
//                     placeholder="Recherche..."
//                     rightIcon={AiOutlineSearch}
//                     className="hidden lg:inline"
//                 />
//             </form>
//             <Button className="w-12 h-10 lg:hidden" color="gray" pill>
//                 <AiOutlineSearch />
//             </Button>
//             <div className="flex gap-2 md:order-2">
//                 <Button className="w-12 h-10 lg:hidden" color="gray" pill>
//                     <FaMoon />
//                 </Button>
//                 <Link to="/sign-in">
//                     {/* <Button gradientDuoTone="purpleToBlue">Connexion</Button> */}
//                 </Link>
//                 <NavbarToggle />
//             </div>

//             <NavbarCollapse>
//                 <NavbarLink as={Link} to="/" active={path === "/"}>
//                     Accueil
//                 </NavbarLink>
//                 <NavbarLink as={Link} to="/about" active={path === "/about"}>
//                     A propos
//                 </NavbarLink>
//                 <NavbarLink
//                     as={Link}
//                     to="/projects"
//                     active={path === "/projects"}
//                 >
//                     Projets
//                 </NavbarLink>
//             </NavbarCollapse>
//         </Navbar>
//     );
// }
///////////////////////////////////////////////////////////////////////

// import {Navbar, TextInput, Button,    NavbarLink,
//     NavbarCollapse,
//     NavbarToggle, Dropdown, Avatar} from 'flowbite-react';
// import {Link, useLocation} from "react-router-dom";
// import {AiOutlineSearch} from 'react-icons/ai';
// import { useSelector } from 'react-redux';
// import {FaMoon} from 'react-icons/fa';






// export default function Header() {
 
//   const path = useLocation().pathname
//   const {currentUser} = useSelector((state) => state.user);
//    console.log(currentUser)
  
  
  
//    //  console.log(path)

//   return (
  
//     <Navbar className='border-b-2'>
//     <Link
//       to='/'
//       className='self-center whitespace-nowrap text-sm sm:text-xl 
//       font-semibold dark:text-white'
//     >
//       <span className='px-5 py-1 bg-gradient-to-r from-indigo-500
//          via-purple-500 to-pink-500 rounded-lg text-white'>
//         Blog
//       </span>
//       Web
//     </Link>
//     <form>
//        <TextInput type='text' 
//         placeholder='Search...'
//         rightIcon={AiOutlineSearch}
//         className='hidden lg:inline'
        
//         />
//     </form>
//     <Button className='w-12 h-10 lg:hidden' color='gray' pill>
//        <AiOutlineSearch />
//     </Button>
//     <div className='flex gap-2 md:order-2'>
//       <Button className='w-12 h-10 hidden sm:inline' color='gray' 
//       pill>
//             <FaMoon />
//       </Button>
//       {
//         currentUser ?(
//            <Dropdown 
//             arrowIcon={false}
//             inline
//             label={
//               <Avatar 
//                 alt="user"
//                 img={currentUser.profilePicture}
//                 rounded
//               />
//             }
//            >
//             <Dropdown.Header>
//               <span className='block text-sm'>@{currentUser.username}</span>
//               <span className='block text-sm font-medium truncate'>@{currentUser.email}</span>
//             </Dropdown.Header>
//             <Link to={'/dashboard?tab=profile'}>
//               <Dropdown.Item>
//                 Profil
//               </Dropdown.Item>
//             </Link>
//               <Dropdown.Divider />
//               <Dropdown.Item>
//                   Déconnexion
//               </Dropdown.Item>
//            </Dropdown>
//         ):(
//            <Link to="/sign-in">
//             <Button gradientduotone='purpleToBlue' outline>
//                 Connexion
//             </Button>
//        </Link>
//         )
//       }
      

        
        
        
      
      
//       <NavbarToggle />
//     </div>

//     <NavbarCollapse>
//         <NavbarLink active={path === "/"} as={'div'}>
//           <Link to='/'>Accueil</Link>
//         </NavbarLink>
//         <NavbarLink active={path === "/about"} as={'div'}>
//           <Link to='/about'>A propos</Link>
//         </NavbarLink>
//         <NavbarLink active={path === "/projects"} as={'div'}>
//           <Link to='/projects'>Projets</Link>
//         </NavbarLink>
//     </NavbarCollapse>
   
   
   
//   </Navbar>
   
//   )
// }


import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaBars, FaTimes, FaSun } from 'react-icons/fa';
import { Avatar, Button } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';

export default function Header() {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);
  const {theme} = useSelector((state) => state.theme)
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dispatch = useDispatch()

  return (
    <nav className="border-b-2 bg-white dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        
        {/* Logo */}
        <Link to="/" className="font-semibold text-xl flex items-center">
          <span className="px-5 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Blog
          </span>
          Web
        </Link>

        {/* Search bar - hidden on mobile */}
        <form className="hidden lg:flex items-center border rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Recherche..."
            className="px-3 py-1 outline-none dark:bg-gray-800 dark:text-white"
          />
          <button type="submit" className="px-3 text-gray-600 dark:text-gray-300 hover:text-indigo-500">
            <AiOutlineSearch size={20} />
          </button>
        </form>

        {/* Search icon button - shown only on mobile */}
        <Button
          className="w-10 h-10 lg:hidden flex items-center justify-center"
          color="gray"
          pill
          onClick={() => alert('Search clicked')}
          aria-label="search"
        >
          <AiOutlineSearch />
        </Button>

        {/* Right side */}
        <div className="flex items-center gap-3 md:order-2">

          {/* Theme toggle button */}
          <button
                        className="p-2 border border-gray-300 rounded-full hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 transition flex items-center justify-center"
                        color="gray"
                        onClick={() => dispatch(toggleTheme())}
                        aria-label="toggle theme"
                    >
                        {theme === "light" ? <FaSun /> : <FaMoon />}
                    </button>

          {/* User menu or Sign In */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                aria-label="user menu"
              >
                <Avatar
                  img={currentUser.profilePicture}
                  rounded
                  alt="User avatar"
                  className='rounded-full'
                />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border rounded shadow-lg z-50">
                  <div className="px-4 py-2 border-b dark:border-gray-700">
                    <p className="text-sm font-semibold">@{currentUser.username}</p>
                    <p className="text-xs truncate">@{currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      navigate('/dashboard?tab=profile');
                      setUserMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                  >
                    Profil
                  </button>
                  <button
                    onClick={() => {
                      alert('Déconnexion');
                      setUserMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/sign-in">
              <Button gradientDuoTone="purpleToBlue" outline>
                Connexion
              </Button>
            </Link>
          )}

          {/* Hamburger menu toggle */}
          <button
            className="ml-2 inline-flex items-center p-2 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <Link
            to="/"
            className={`block px-4 py-2 border-b dark:border-gray-700 ${
              path === '/' ? 'bg-indigo-100 dark:bg-indigo-700 font-bold' : ''
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Accueil
          </Link>
          <Link
            to="/about"
            className={`block px-4 py-2 border-b dark:border-gray-700 ${
              path === '/about' ? 'bg-indigo-100 dark:bg-indigo-700 font-bold' : ''
            }`}
            onClick={() => setMenuOpen(false)}
          >
            A propos
          </Link>
          <Link
            to="/projects"
            className={`block px-4 py-2 border-b dark:border-gray-700 ${
              path === '/projects' ? 'bg-indigo-100 dark:bg-indigo-700 font-bold' : ''
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Projets
          </Link>
        </div>
      )}
    </nav>
  );
}
