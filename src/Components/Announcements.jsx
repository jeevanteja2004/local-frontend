import React, { useEffect, useState } from "react";
import "./Announcements.css";
import { IoAddSharp } from "react-icons/io5";
import Modal from "react-modal";
import AnnonCard from "./Annon-Card";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root"); // IMPORTANT
const colors=["#38d044ff","#bc4d4dff","#c0a229ff","#2abe97ff","#2f94d8ff","#480e9fff","#3b0770ff","#d24075ff","#a72020ff","#9fca14ff","#dc7d17ff","#231b1bff"]

const Announcements = () => {
    const [addForm, setAddForm] = useState(false);
    const [annocList,setAnnocList]=useState([]);
    const [description,setDescription]=useState("");
   
    const showToast = () => {
    toast.info("Please read this message and close manually", {
      autoClose: false,        // Toast stays forever
      closeOnClick: false,     // Won’t close on click
      pauseOnHover: false,
      draggable: false,
    });
  }
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
     const getAll=async()=>{
        try{    
            const req=await axios.get("https://localnest-backend.onrender.com/api/announcements/all")
             const sorted = req.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
            setAnnocList(sorted)
            
            
            
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getAll()
    })
    const addAnnoc=async(e)=>{
       e.preventDefault()
        const user = JSON.parse(localStorage.getItem("user"));
        try{
            const addAnnoc=await axios.post('https://localnest-backend.onrender.com/api/announcements/add',{
                description:description,
                createdBy:user.username,
                color:randomColor
            })
            
             setAddForm(false)
             getAll()
        }catch(err){
            console.log(err)
        }
    }
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
        <div className={addForm ? "annon-container-with-form" : "annon-container"}>
            
            <div className="annon-line">
                <h2 className="annon-heading">Announcements</h2>
                <button className="annon-add" onClick={() => setAddForm(true)}>
                    Add <IoAddSharp />
                </button>
            </div>

            <div >
            <ul  className="annon-cards">
                {annocList.map((each)=>{
                   
                    return <AnnonCard  email={each.createdBy} description={each.description} createdAt={timeAgo(each.createdAt)} />
                })}
                </ul>



            </div>

            {/* Modal */}
            <Modal
                isOpen={addForm}
                
                className="modal-box"
                overlayClassName="modal-overlay"
            >
                <h2 className="modal-title">Add Announcement</h2>

                <form className="modal-form" onSubmit={addAnnoc}>
                    

                    <label>Description</label>
                    <textarea placeholder="Write your announcement..." onChange={(e)=>setDescription(e.target.value)}></textarea>

                    <div className="modal-buttons">
                        <button 
                            type="button" 
                            className="cancel-btn" 
                            onClick={() => setAddForm(false)}
                        >
                            Cancel
                        </button>

                        <button type="submit" className="submit-btn" >
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>

        </div>
    );
};

export default Announcements;
