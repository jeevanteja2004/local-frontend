import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./LostFound.css"
import { IoAddSharp } from "react-icons/io5";
import { TbCloudUpload } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
Modal.setAppElement("#root"); 
const lossorFOundcards=[
  
]
const LostFound = () => {
    const [addLost,setAddLost]=useState(false)
    const [card,setCard]=useState([])
    const [itemName,setitemName]=useState("")
    const [content,setcontent]=useState("")
    const [status, setStatus] = useState("Found"); 
    const [ImgUrl,setImgUrl]=useState("")
    const [time,setTime]=useState("")
    const [showsub,setShowsub]=useState(false)
     const getAll=async()=>{
        try{    
            const req=await axios.get("https://localnest-backend.onrender.com/api/lostfound/all")
             const sorted = req.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
            setCard(sorted)
            
            console.log(req.data)
        }catch(error){
            console.log(error)
        }
    }
    const handleLoseFound=async(e)=>{
        e.preventDefault();
         const user = JSON.parse(localStorage.getItem("user"));
        try{
             const res=await axios.post('https://localnest-backend.onrender.com/api/lostfound/add',{
            itemName: itemName,
            content: content,
            image: ImgUrl,
            postedBy:user.username,
            status,
            date:time
          })
          await getAll();
          setAddLost(false);
          setShowsub(false)
        }catch(err){
            console.log(err)
        }
        
    }
     const handleImg = async (e) => {
      
  const file = e.target.files[0];
  console.log(file)
  if (!file) return;
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "first_cloudinary");
  data.append("cloud_name", "dlpqscdaz");
  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dlpqscdaz/image/upload",
      data
    );
    const s=res.data.secure_url;
     console.log("Uploaded Image URL:", s);
     if(s){
      setShowsub(true)
     }
    setImgUrl(res.data.secure_url)
    console.log("love",ImgUrl)
  } catch (error) {
    console.log("Upload Error:", error);
  }
}; 
   
    useEffect(()=>{
        getAll();
    },[])
    return (
        <div>
            <div className="annon-line">
                            <h2 className="annon-heading">LostAndFound</h2>
                            <button className="annon-add" onClick={()=>setAddLost(true)}>
                                Add <IoAddSharp />
                            </button>
                        </div>
                   <div className="lastfound-cards">   
                    {card.map((each)=>{
                        return (
                                <div class="cards f">
                                    <div class="card-image" style={{ backgroundImage: `url(${each.image})` }}>
                                       
                                    </div>
                                    <div class="author">
                                         <p className="name">{each.itemName}</p>   
                                         <div className="status-delete"> 
                                         <p className={each.status=="Found"?"found":"loss"}>{each.status}</p>
                                       
                                         </div>
                                    </div>
                                    
                                    <div class="heading con"> {each.content} </div>
                                 <div class="author">
                                    <p class="name">By {each.postedBy}</p>
                                    <p className="name">{each.date} </p>
                                  
                                  </div>

                                </div>
                        )
                    })}


</div>
        <Modal
                            isOpen={addLost}
                            
                            className="modal-box"
                            overlayClassName="modal-overlay"
                        >
                            <h2 className="modal-title">Add Item</h2>
            
                            <form className="modal-form" onSubmit={handleLoseFound}>
                                
                                <label>Item</label>
                                <input type="input" placeholder="Write Item Name" onChange={(e)=>setitemName(e.target.value)}/>
                                <label>Where You Loss Or Found</label>
                                <textarea placeholder="Write your announcement..." onChange={(e)=>setcontent(e.target.value)}></textarea>
                                
                                <div className="lost-found-date-drop">
                                    <div className="bgh">
                                    <label>Date</label>
                                <input type="date" placeholder="" onChange={(e)=>setTime(e.target.value)}/>
                                </div>
                                <div className="bg">
                                <lable>Select Type</lable>
                                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="Found">Found</option>
                                <option value="Loss">Loss</option>
                                </select>

                                </div>
                                </div>
                                   <div className="upload-box">
                                    <label className="upload-label">Upload Image:</label>
                                
                                    <label htmlFor="imageInput" className="upload-container">
                                        <span className="upload-icon"><TbCloudUpload /></span>
                                        <span className="upload-text">Click to upload image</span>
                                  </label>  
                                
                                    <input type="file" id="imageInput" accept="image/*" onChange={handleImg}/>
                                </div>


                                <div className="modal-buttons">
                                    <button 
                                        type="button" 
                                        className="cancel-btn" 
                                        onClick={() => setAddLost(false)}
                                    >
                                        Cancel
                                    </button>
                                    {showsub?<button type="submit" className="submit-btn">
                                        Submit
                                    </button>:<div className="submit-btn notallow">
                                        loading...
                                    </div>}
                                    
                                    
                                </div>
                            </form>
                        </Modal>
        </div>
    );
}
export default LostFound;