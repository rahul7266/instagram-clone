import { React, useContext } from "react";
import "./modal.css";
import { RiCloseLine } from "react-icons/ri";
import { loginContext } from "../context/loginContext";
import {  useNavigate } from "react-router-dom" ;

export default function Modal() {
  const navigate = useNavigate() ;
  const { setmodalOpen } = useContext(loginContext);
  return (
    <div className="darkBg" onClick={() => setmodalOpen(false)}>
      <div className="centered">
        <div className="modal">
          {/* modalHeader */}
          <div className="modalHeader">
            <h5 className="heading">modal</h5>
          </div>
          <button className="closeBtn" onClick={() => setmodalOpen(false)}>
            <RiCloseLine />
          </button>
          {/* modalContent */}
          <div className="modalContent"></div>
          {/* modalActions */}
          <div className="modalActions">
            <div className="actionsContainer">
              <button
                className="logOutBtn"
                onClick={() => {
                  localStorage.clear();
                  setmodalOpen(false);
                  navigate('./signin') ;
                }}
              >
                LogOut
              </button>
              <button className="cancelBtn" onClick={() => setmodalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
