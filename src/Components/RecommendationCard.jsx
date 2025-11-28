import { useState } from "react";
import "./RecommendationCard.css"
import axios from "axios";
const RecommendationCard = ({ item }) => {
  const [showReviews, setShowReviews] = useState(false);
  const [review,setReviews]=useState("");
  const handleComment=async(id)=>{
    
     const user = JSON.parse(localStorage.getItem("user"));
    try{
      const req=await axios.post(`https://localnest-backend.onrender.com/api/recommendations/addReview/${id}`,{
        text: review,
        userName:user.username,
      })
      setReviews("")
    }catch(err){
      console.log(err)
    }
  }
  return (
    <>
    <div className={showReviews?"rec-card-click":"rec-card "}>
      <h6>{item.title}</h6>
      <img src={item.image} className="rec-img"/>
      <div className="rec-des">
      <p className="rec-para">{item.description}</p>
      </div>
      <div className="rating-row">
        <div><p>By {item.recommendedBy}</p></div>
        <div onClick={() => setShowReviews(!showReviews)}>{item.reviews.length} reviews</div>
        
      </div>
      {showReviews && (
         <div className="reviews-box">
          <ul className="reviews-area">
               {showReviews && (
        <div className="reviews-box">
          <ul className="x">
            {item.reviews.map((r, index) => (
            <div key={index} className="review-item">
              <strong>{r.userName}:</strong> {r.text}
            </div>
          ))}</ul>

          
        </div>
      )}
            </ul>

          <textarea placeholder="Write your review..." className="review-input" onChange={(e)=>setReviews(e.target.value)} value={review}></textarea>
          <div className="subreview-btns">
          <button className="submit-review-btn"  
          onChange={(e)=>{
            setReviews(e.target.value)
          }}
          onClick={()=>
            
            handleComment(item._id)}>Submit Review</button>
            <button className="back-btn" onClick={() => setShowReviews(!showReviews)}>back</button>
            </div>
        </div>
      )}
      {/*<h3>{item.name}</h3>
      {item.image && <img src={item.image} alt="img" className="rec-img" />}

      <p>{item.description}</p>

      <div className="rating-row">
        ⭐ {item.averageRating} ({item.reviews.length} reviews)
      </div>

      <button className="toggle-btn" onClick={() => setShowReviews(!showReviews)}>
        {showReviews ? "Hide Reviews ▲" : "Read Reviews ▼"}
      </button>

     }*/}
    </div>
        
    </>
  );
};

export default RecommendationCard;
