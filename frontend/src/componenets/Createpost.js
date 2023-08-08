import React,{useState,useEffect} from "react";
import './Createpost.css'
import {  toast } from 'react-toastify';
import {  useNavigate } from "react-router-dom" ;



export default function Createpost() {
  const navigate = useNavigate() ;
  const [body, setbody] = useState("") ;
  const [image, setimage] = useState("") ;
  const [url, seturl] = useState("") ;

  const notifyA = (err) =>{
    toast.error(err) ;
   
  }

  const notifyB = (msg) =>{
    toast.success(msg) ;

  }

  useEffect(() => {
    if(url){
      fetch("http://localhost:5000/createpost", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer "+localStorage.getItem("jwt") 
         },
        body: JSON.stringify({
          body,
          pic:url
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        if(data.error){
           notifyA(data.error) ;
        }
        else{
          notifyB(data.message) ;
          navigate('/') ;
          
        }
        console.log(data)
      });
    }
  }, [url]) ;
  

  const shareDetails = ()=>{
    console.log(body,image) ;

    const data = new FormData() ;
    data.append("file",image) ;
    data.append("upload_preset","insta-clone") ;
    data.append("cloud_name","rahul7266") ;
    fetch("https://api.cloudinary.com/v1_1/rahul7266/image/upload",{
      method:"post",
      body:data
    })
    .then(res=> res.json() )
    .then(data=>seturl(data.url))
    .catch(err=>console.log(err)) ;

  
};


    const loadPost = (event)=>{
      var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
    }

  return (
    <div className="createpost">
      {/* post-header  */}
      <div className="post-header">
        <h4>Create New Post</h4>
        <button type="button" id="post-btn" onClick={()=>{shareDetails()}}>share</button>
      </div>
      {/* main-div  */}
      <div className="main-div">
        <img src="https://cdn.icon-icons.com/icons2/510/PNG/512/image_icon-icons.com_50366.png" 
        alt="" 
        id="output" />
        <input type="file" accept="image/*" onChange={(event)=>{loadPost(event); setimage(event.target.files[0])}} />
      </div>
      {/* detail  */}
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img
              src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=626&ext=jpg"
              alt=""
            />
          </div>
          <h5>Michel Jackson</h5>
        </div>
        <textarea type="text" placeholder="write a caption.... " value={body} onChange={(e)=>{
          setbody(e.target.value)
        }}></textarea>
      </div>
    </div>
  );
}
