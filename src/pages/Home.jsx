import React from "react";
import "../index.css";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Announcements from "../Components/Announcements";
import LostFound from "../Components/LostFound";
import Recommendations from "../Components/Recommendations";
import Comments from "../Components/Comments";
import UserReputation from "../Components/UserReputation";
const Home = () => {
  const selectedFeature = useSelector((state) => state.feature.selected);
  const renderContent = () => {
    switch (selectedFeature) {
      case "announcements":
        return <Announcements />;

      case "lostfound":
        return <LostFound />;

      case "recommendations":
        return <Recommendations />;

      
      case "comments":
        return <Comments />;

      case "userReputation":
        return <UserReputation />;

     

      default:
        return <h2>Select an option from the Sidebar</h2>;
    }
  };
  return (
    <div >
    <Navbar />
      
     
    <div className="home-content">
      {renderContent()}
      
    </div>
    </div>
  );
};

export default Home;
