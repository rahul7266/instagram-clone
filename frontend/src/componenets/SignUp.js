import React, { useEffect, useState } from "react";

import {  toast } from 'react-toastify';

import insta_logo from "../img/insta_logo.png";
import "./SignUp.css";

import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate() ;

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
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
        name: name,
        username: username,
        email: email,
        password: password,
      }),
    };
    
    fetch("http://localhost:5000/signUp", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if(data.error){
           notifyA(data.error) ;
        }
        else{
          notifyB(data.message) ;
           navigate("/signin") ;
        }
        console.log(data)
      });
  };

  return (
    <div className="signUp">
      <div className="form-container">
        <div className="form">
          <img className="signUpLogo" src={insta_logo} alt="" />
          <p className="loginPara">
            SignUp to see photo and videos <br /> from your friends.
          </p>
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
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
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
          <p
            className="loginPara"
            style={{ fontSize: "12px", margin: "3px 0px" }}
          >
            By singnig up you agree to out terms, <br /> privacy policy and
            cookies policy
          </p>
          <input
            type="submit"
            id="submit-btn"
            value="Sign Up"
            onClick={() => {
              postData();
            }}
          />
        </div>
        <div className="form2">
          already have an account?
          <Link to="/signin">
            <span style={{ color: "blue", cursor: "pointer" }}>signIn</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
