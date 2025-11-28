import React, { useState, useEffect } from "react";
import "./UserReputation.css";
import axios from "axios";
import { toast } from "react-toastify";

// ----------------------------
// TEMP — Replace with real logged-in user id
// ----------------------------

// You MUST replace this with your logged user ID from context or localStorage

const UserReputation = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // ----------------------------
  // Fetch all users
  // ----------------------------
  const getUsers = async () => {
    try {
      const res = await axios.get("https://localnest-backend.onrender.com/api/reputations/allUser");

      const formatted = res.data.users.map(u => ({
        id: u._id,
        name: u.name,
        image: u.image || "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=",
        score: u.score || 0,
        votes: u.votedId || []
      }));

      setUsers(formatted);

    } catch (err) {
      console.error("Error loading users:", err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // ----------------------------
  // Update UI after vote
  // ----------------------------
  const updateUser = (id, score) => {
    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, score } : u))
    );
  };
  

  // ----------------------------
  // UPVOTE
  // ----------------------------
  const handleUpvote = async (id) => {

    const voterId=id
    if(localStorage.getItem("token")){
      try {
      const res = await axios.post(
        `https://localnest-backend.onrender.com/api/reputations/upvote/${id}`,
        { voterId }
      );

      if (!res.data.success) return toast.error(res.data.message);

      updateUser(id, res.data.user.score);
    } catch (err) {
      toast.error("Upvote failed!");
    }
    }else{
      toast.error("login to vote")
    }
    
  };

  // ----------------------------
  // DOWNVOTE
  // ----------------------------
  const handleDownvote = async (id) => {
    const voterId=id
    try {
      const res = await axios.post(
        `https://localnest-backend.onrender.com/api/reputations/downvote/${id}`,
        { voterId }
      );

      if (!res.data.success) return toast.error(res.data.message);

      updateUser(id, res.data.user.score);
    } catch (err) {
      toast.error("Downvote failed!");
    }
  };

  // ----------------------------
  // UNDO
  // ----------------------------
  const handleWithDraw = async (id) => {
    const voterId=id
    try {
      const res = await axios.post(
        `https://localnest-backend.onrender.com/api/reputations/withDraw/${id}`,
        { voterId, type: "up" } // You can modify if needed
      );

      if (!res.data.success) return toast.error(res.data.message);

      updateUser(id, res.data.user.score);
    } catch (err) {
      toast.error("Undo failed!");
    }
  };

  // ----------------------------
  // SEARCH FILTER
  // ----------------------------
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="annon-line">
        <h2 className="annon-heading">User Reputation</h2>
      </div>

      <div className="rep">
        <div className="rep-container">

          <input
            type="text"
            className="search-box"
            placeholder="Search username..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <div className="list">
            {filteredUsers.map(user => (
              <div className="card" key={user.id}>

                <img src={user.image} alt="profile" className="user-img" />

                <div className="info">
                  <h4>{user.name}</h4>
                  <p>Reputation Score: <b>{user.score}</b></p>
                </div>
                <hr className="li" />

                <div className="btns">
                  <button className="up" onClick={() => handleUpvote(user.id)}>👍</button>
                  
                  <button className="up" onClick={() => handleWithDraw(user.id)}>withDraw</button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default UserReputation;
