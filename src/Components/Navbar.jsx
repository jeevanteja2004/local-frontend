import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const Navbar = () => {
 

  return (
    <nav className="navbar">
        <div className="k">
       <div className="sidebar-in-home">  <Sidebar /></div>
      
       <div><p className="lokalnest">Lokal Nest</p></div>
     

      </div>
    </nav>
  );
};

export default Navbar;
