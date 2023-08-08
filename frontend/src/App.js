import Navbar from "./componenets/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React,{ useContext,useState } from "react";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./componenets/Home"
import SignIn from "./componenets/SignIn"
import SignUp from "./componenets/SignUp"
import Profile from "./componenets/Profile"
import Createpost from "./componenets/Createpost"
import Modal from "./componenets/Modal";

import {loginContext} from './context/loginContext'

import './app.css'

function App() {
  const [userLogin, setuserLogin] = useState(false) ;
  const [modalOpen, setmodalOpen] = useState(false) ;
  return (
    <BrowserRouter>
     
      <div className="App">
       <loginContext.Provider value={{setuserLogin,setmodalOpen}}>
       <Navbar login={userLogin}/>
        <Routes>
          <Route path="/" element={<Home/>}>Home</Route>
          <Route path="/signup" element = {<SignUp/>}>SignUp</Route>
          <Route path="/signin" element = {<SignIn/>}>SignIn</Route>
          <Route path="/profile" element = {<Profile/>}>Profile</Route>
          <Route path="/createpost" element = {<Createpost/>}>Profile</Route>

        </Routes>
        <ToastContainer
         
          theme="dark"
        />
      {modalOpen && <Modal></Modal>}
       </loginContext.Provider>
       
      </div>
    </BrowserRouter>
  );
}

export default App;
