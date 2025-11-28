import React, { useEffect, useState } from "react";
import RecommendationCard from "./RecommendationCard";
import { IoAddSharp } from "react-icons/io5";
import { TbCloudUpload } from "react-icons/tb";
import axios from "axios";
import Modal from "react-modal";
import "./Recommendations.css"


const Recommendations = () => {
    const [recList,setrecList]=useState([])
    const [addRec,setAddRec]=useState(false)
    const [addItem,setaddItem]=useState("")
    const [addDescription,setaddDescription]=useState("")
    const [imgUrl,setimgUrl]=useState("")
    const [showsub,setShowsub]=useState(false);
   
    const handleimg = async (e) => {
      
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
     
    setimgUrl(res.data.secure_url)
    console.log("love",imgUrl)
  } catch (error) {
    console.log("Upload Error:", error);
  }
}; 
   const getAllRecommendations=async()=>{
    try{
      const res=await axios.get("https://localnest-backend.onrender.com/api/recommendations/all")
      const sorted = res.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setrecList(sorted);
    }catch(err){
        console.log(err)
    }
   }
   useEffect(()=>{
    getAllRecommendations();
   })
   const recommendationFormHandle=async(e)=>{
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        try{
          const res=await axios.post('https://localnest-backend.onrender.com/api/recommendations/add',{
            title: addItem,
            description: addDescription,
            image: imgUrl,
            recommendedBy:user.username,
            reviews: []
          })
          setShowsub(false)
          getAllRecommendations();
          setAddRec(false)
        }catch(err){
          console.log(err)
        }
   }
    
    return (
        <div>
           <div className="annon-line">
                 <h2 className="annon-heading">Recommendations</h2>
                        <button className="annon-add" onClick={()=>setAddRec(true)}>
                                           Add <IoAddSharp />
                                       </button>
            </div>
            <div >
              <ul className="rec-cross">
                {recList.map((item)=>{
                  return  <RecommendationCard item={item}/>
                })}
              </ul>
          
            </div>
             <Modal
                            isOpen={addRec}
                           
                            className="modal-box"
                            overlayClassName="modal-overlay"
                        >
                            <h2 className="modal-title">Add Recommendations</h2>
            
                             <form className="modal-form" onSubmit={recommendationFormHandle}>
                                
                                <label>Item</label>
                                <input type="input" placeholder="Write Item Name" onChange={(e)=>setaddItem(e.target.value)} required/>
                                <label>Description</label>
                                <textarea placeholder="Write your announcement..." onChange={(e)=>setaddDescription(e.target.value)} required></textarea>
                                
                                <div className="upload-box">
    <label className="upload-label">Upload Image:</label>

    <label htmlFor="imageInput" className="upload-container">
        <span className="upload-icon"><TbCloudUpload /></span>
        <span className="upload-text">Click to upload image</span>
  </label>  

    <input type="file" id="imageInput" accept="image/*" onChange={handleimg} />
</div>



                                <div className="modal-buttons">
                                    <button 
                                        type="button" 
                                        className="cancel-btn" 
                                        onClick={() => setAddRec(false)}
                                    >
                                        Cancel
                                    </button>
            
                                    {showsub?<button type="submit" className="submit-btn" >
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
export default Recommendations;