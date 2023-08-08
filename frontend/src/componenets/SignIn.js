import React, { useEffect, useState,useContext } from "react";
import { loginContext } from "../context/loginContext";

import {  toast } from 'react-toastify';

import insta_logo from "../img/insta_logo.png";
import "./SignUp.css";

import { Link, useNavigate } from "react-router-dom" ;

export default function SignIn() {

  const {setuserLogin} = useContext(loginContext) ;
  const navigate = useNavigate() ;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const notifyA = (err) =>{
    toast.error(err) ;
   
  }

  const notifyB = (msg) =>{
    toast.success(msg) ;

  }

  const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
  const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/ ;

  const postData = () => {
    // console.log({ name, username, email, password });
    if(!emailRegx.test(email)){
      console.log(true) ;
      notifyA("please enter valid email") ;
      return ;
    }
    else if(!passRegex.test(password)){
      notifyA("password contain eight character and atleast one uppercase letter ,lowercase letter, number and special character.")
      return ;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    fetch("http://localhost:5000/signin", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if(data.error){
           notifyA(data.error) ;
        }
        else{
          notifyB(data.message) ;
          localStorage.setItem("jwt",data.token) ;
          localStorage.setItem("user",JSON.stringify(data.user)) ;
          setuserLogin(true) ;
          navigate('/') ;
        }
        console.log(data)
      });
  };


  return (
    <div className='signIn'>
      <div className="form-container">
        <div className="form">
          <img className="signUpLogo" src={insta_logo} alt="" />
         
          <div>
          <input
              type="email"
              name="email"
              id="email"
              placeholder="enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          
          <div>
          <input
              type="password"
              name="password"
              id="password"
              placeholder="enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <input
            type="submit"
            id="submit-btn"
            value="SignIn"
            onClick={() => {
              postData();
            }}
          />
        </div>
        <div className="form2">
          create a new account?
          <Link to="/signup">
            <span style={{ color: "blue", cursor: "pointer" }}>signUp</span>
          </Link>
        </div>
      </div>

    </div>
  )
}
