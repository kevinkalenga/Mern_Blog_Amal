import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  

  return (
    <BrowserRouter>
        <Header />
        <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/about" element={<About />} />
           <Route path="/sign-in" element={<SignIn />} />
           <Route path="/sign-up" element={<SignUp />} />
           <Route element={<PrivateRoute />}>
                 <Route path="/dashboard" element={<Dashboard />} />
           </Route>
          
           <Route path="/projects" element={<Projects />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
