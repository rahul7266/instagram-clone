import React, { useState, useEffect } from "react";
import "./Home.css";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/signup");
    }
    fetch("http://localhost:5000/allposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return setdata(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const likePost = (id) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/signup");
    }
    fetch("http://localhost:5000/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        const updateData = data.map((post) => {
          if (result._id == post._id) {
            return result;
          } else {
            return post;
          }
        });
        setdata(updateData);
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  const unlikePost = (id) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/signup");
    }
    fetch("http://localhost:5000/unlike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        const updateData = data.map((post) => {
          if (result._id == post._id) {
            return result;
          } else {
            return post;
          }
        });
        setdata(updateData);
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      {/* card */}
      {data.map((post) => {
        return (
          <div className="card">
            <div className="card-header">
              <div className="card-pic">
                <img
                  src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=626&ext=jpg"
                  alt=""
                />
              </div>
              <h5>{post.postedBy.name}</h5>
            </div>
            {/* card-image */}
            <div className="card-image">
              <img src={post.photo} alt="" />
            </div>
            {/* card-content  */}
            <div className="card-content">
              {post.likes.includes(
                JSON.parse(localStorage.getItem("user"))._id
              ) ? (
                <span
                  className="material-symbols-outlined material-symbols-outlined-red"
                  onClick={() => {
                    unlikePost(post._id);
                  }}
                >
                  favorite
                </span>
              ) : (
                <span
                  className="material-symbols-outlined"
                  onClick={() => {
                    likePost(post._id);
                  }}
                >
                  favorite
                </span>
              )}
             
              <p>{post.likes.length} like</p>

              <p>{post.body}</p>
            </div>
            {/* add-comment  */}
            <div className="add-comment">
              <span className="material-symbols-outlined">mood</span>
              <input type="text" placeholder="add a comment" />
              <button className="comment">post</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
