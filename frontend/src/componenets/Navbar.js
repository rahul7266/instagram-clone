import {React, useContext} from "react";
import insta_logo from "../img/insta_logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { loginContext } from "../context/loginContext";

export default function Navbar({login}) {
  const {setmodalOpen} = useContext(loginContext) ;
  const loginStatus = () => {
    const token = localStorage.getItem("jwt") ;
    if (token || login) {
      return [
        <>
        <Link to="/profile">
          <li>Profile</li>
        </Link>

        <Link to="/createpost">
          <li>Create Post</li>
        </Link>
        <Link><button className="primaryBtn" onClick={()=>setmodalOpen(true)}>Log Out</button></Link>
      </>
      ];
    } else {
      return [
        <>
          <Link to="/signup">
            <li>SignUp</li>
          </Link>

          <Link to="/signin">
            <li>SignIn</li>
          </Link>
        </>
       
      ];
    }
  };
  return (
    <div className="navbar">
      <img src={insta_logo} alt="" />

      <ul>
        {loginStatus()}
      </ul>
    </div>
  );
}
