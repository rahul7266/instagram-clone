import React,{useState, useEffect} from "react";
import "./Profile.css";
import {  useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate() ;
  const [mydata, setmydata] = useState([]) ;

    useEffect(() => {
     const token = localStorage.getItem("jwt") ;
     if(!token){
      navigate('/signup') ;
     }
     fetch("http://localhost:5000/myposts", {
      headers: { 
        "Authorization": "Bearer "+localStorage.getItem("jwt") 
       }
    })
    .then((response) => response.json())
    .then((data) => {
      return setmydata(data) ;
    }).catch(err=>console.log(err));
    }, [])
  return (
        <div className="profile">
      {/* profile-frame  */}
      <div className="profile-frame">
        {/* profile-pic */}
        <div className="profile-pic">
          <img
            src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=626&ext=jpg"
            alt=""
          />
        </div>
        {/* profile-data  */}
        <div className="profile-data">
          <h1>Michel Jackson</h1>
          {/* profile-info  */}
          <div className="profile-info">
            <p>10 post</p>
            <p>20 follwers</p>
            <p>30 following</p>
          </div>
        </div>
      </div>
      <hr />
      {/* gallary */}
      
      <div className="gallary">
      {mydata.map((data)=>{
       return (
        <img
          key={data._id}
          src={data.photo}
          alt=""
        />
        )
      })}  
      </div>
    </div>
    
  );
}
