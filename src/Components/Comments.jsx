import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./Comments.css";
import { IoAddSharp } from "react-icons/io5";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";



Modal.setAppElement("#root");

const Comments = () => {
  const [addComm, setAddComm] = useState(false);
  const [comm, setComm] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [username,setusername]=useState("no user");
  const [likeStatus, setLikeStatus] = useState({});



const allComments = async () => {
  try {
    const req = await axios.get("https://localnest-backend.onrender.com/api/comments/all");

    // Sort latest → oldest
    const sorted = req.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setCommentList(sorted);

    // 🔥 Detect which comments user already liked
    const userId = localStorage.getItem("userId");
    const status = {};

    sorted.forEach(c => {
      status[c._id] = c.likedBy.includes(userId);
    });

    setLikeStatus(status);  // <-- save to state

  } catch (err) {
    console.log(err);
  }
};

const toggleLike = async (commentId) => {
  const userId = localStorage.getItem("userId");

  try {
    const res = await axios.post(
      `https://localnest-backend.onrender.com/api/comments/like/${commentId}`,
      { userId }
    );
    localStorage.setItem("commentId",res.data.userId)

    // update comment list
    setCommentList(prev =>
      prev.map(c => (c._id === commentId ? res.data : c))
    );

    // update like status for UI
    setLikeStatus(prev => ({
      ...prev,
      [commentId]: res.data.likedBy.includes(userId)
    }));
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  
  allComments();
  
  
}, []);
const deleteFun = async (commentId) => {
  const userId = localStorage.getItem("userId");

  const comment = commentList.find(c => c._id === commentId);

  // Check ownership
  if (comment.userId !== userId) {
    return toast.error("You can delete only your comment");
  }

  try {
    await axios.delete(
      `https://localnest-backend.onrender.com/api/comments/delete/${commentId}`
    );

    // Remove comment from UI
    setCommentList(prev => prev.filter(c => c._id !== commentId));

    toast.success("Comment deleted");
    allComments();
  } catch (err) {
    console.log(err);
    toast.error("Error deleting comment");
  }
};



const addFormApi = async (e) => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return toast.error("Please login first");
  console.log("newusername",user.username);
  setusername(user.username)
  try {
    const userId=localStorage.getItem("userId")
    const req = await axios.post("https://localnest-backend.onrender.com/api/comments/add", {
      userId: userId,
      userName: user.username,
      comment: comm,
      likes:0
    });

    setCommentList(prev => [...prev, req.data]);  // fixed
    setComm("");
    setAddComm(false);
    allComments()
    toast.success("Comment added");
  } catch (err) {
    console.log(err);
  }
};
  const timeAgo = (timestamp) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diff = (now - past) / 1000; // seconds

  if (diff < 60) return "Just now";
  if (diff < 3600) return Math.floor(diff / 60) + " min ago";
  if (diff < 86400) return Math.floor(diff / 3600) + " hours ago";
  return Math.floor(diff / 86400) + " days ago";
};


  return (
    <div>
      <div className="annon-line">
        <h2 className="annon-heading">Comments</h2>
        <button className="annon-add" onClick={() => setAddComm(true)}>
          Add <IoAddSharp />
        </button>
      </div>

      <div className="allComments">
        {commentList.map((each, index) => (
          
          <div className="comment-box" key={index}>
            <div className="comment-header">
              <img className="comment-avatar" src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=" alt="user" />

              <div className="comment-info">
                <span className="comment-username">{each.userName}</span>
                 <span className="comment-time">{timeAgo(each.createdAt)}</span>
              </div>

              <div className="comment-actions">
                <button className="comment-like">
                  <div className="btn-react">
                    


                    <div onClick={() => toggleLike(each._id)}>
  {likeStatus[each._id] ? (
    <FaThumbsUp className="thumbicon" />
  ) : (
    <FaRegThumbsUp className="thumbicon" />
  )}
</div>



                   
                    <p className="btn-count">{each.likes}</p>
                  </div>
                </button>
              </div>
              <div onClick={() => deleteFun(each._id)}>
  <AiOutlineDelete className="deleteIcon" />
</div>

            </div>
            <hr className="line-com"></hr>
            <div className="comment-text"> <p >{each.comment}</p></div>
           
          </div>
        ))}
      </div>

      <Modal isOpen={addComm} className="modal-box" overlayClassName="modal-overlay">
        <h2 className="modal-title">Add Comment</h2>

        <form className="modal-form" onSubmit={addFormApi}>
          <label>Comment</label>

          <textarea
            placeholder="Write your Comment..."
            value={comm}
            onChange={(e) => setComm(e.target.value)}
          ></textarea>

          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={() => setAddComm(false)}>
              Cancel
            </button>

            <button type="submit" className="submit-btn">Add</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Comments;
