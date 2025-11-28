import React from "react";
import "./Annon-Card.css";

const AnnonCard = ({ email, description ,createdAt,color}) => {
  
  return (
    <div className="announce-card">
      <div className="announce-header">
        
        <div className="profile-circle" style={{background:color}}>{email[0].toUpperCase()}</div>
        <div>
          <p className="announce-email">{email}</p>
          <p className="announce-time">{createdAt}</p>
        </div>
      </div>
      <hr></hr>
      <p className="announce-description">{description}</p>
    </div>
  );
};

export default AnnonCard;

