import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { BsFillMegaphoneFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { FaHandPaper } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { IoChatboxEllipses } from "react-icons/io5";
import { RiUserSearchFill } from "react-icons/ri";
import { RiHourglassFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { setFeature } from "../redux/featureSlice";
import axios from "axios";
const Sidebar = () => {
     const dispatch = useDispatch();

  const handleClick = (feature) => {
    dispatch(setFeature(feature));
  };
  const [open, setOpen] = useState(false);
  const [username,setusername]=useState("no user");
  const [email,setEmail]=useState("no Email");
  const token = localStorage.getItem("token");
  const nav=useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId")
    localStorage.removeItem("user")
    nav("/login");
    window.location.reload();
  };
  const getUserDetails=async()=>{
    try{
      const userId=localStorage.getItem("userId")
      const res = await axios.get(`https://localnest-backend.onrender.com/api/auth/user/${userId}`);
setusername(res.data.name);
setEmail(res.data.email);


    }catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
      getUserDetails();
    }, []);
    
  return (
    <>
      {/* Mobile Toggle Button */}
      <button className="menu-btn" onClick={() => setOpen(!open)}>
        ☰ 
      </button>

     <div className={`sidebar ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
        <div className="profile">
            <div className="profile-img"></div>
            <div className="profile-details">
            <p className="profile-name">{username}</p>
            <p className="profile-email">{email}</p>
            </div>
        </div>
        <hr style={{marginTop:"15px"}}/>
        <ul>
          <div className="each-feature" onClick={() => handleClick("announcements")}>
            <BsFillMegaphoneFill className="icon"/> 
            <p>Announcements</p>
          </div>
            <div className="each-feature" onClick={() => handleClick("lostfound")}>
            <BsSearch className="icon"/><p>Lost & Found</p>
          </div>
            <div className="each-feature" onClick={() => handleClick("recommendations")}>
            <FaHandPaper className="icon"   /> <p>Recommendations</p>
          </div>
            
            <div className="each-feature" onClick={() => handleClick("comments")}>
            <IoChatboxEllipses className="icon" /> <p>Comments</p>
          </div>
            <div className="each-feature" onClick={() => handleClick("userReputation")}>
            <RiUserSearchFill className="icon" /> <p>User Reputation</p>
          </div>
           
        </ul>
        <div>
        {!token ? (
          <>
            <Link to="/login" className="btn-login">Login</Link>
            
          </>
        ) : (
          <button className="btn-logout" onClick={logout}>
            Logout
          </button>
        )}
      </div>
      </div>


     
    </>

  );
};

export default Sidebar;
