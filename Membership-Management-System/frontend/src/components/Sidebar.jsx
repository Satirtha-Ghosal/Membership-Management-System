import React, { useState } from "react";
import "../styles/Sidebar.css"; // Import the CSS file
import { NavLink, Outlet } from "react-router-dom";

import { AiFillDashboard } from "react-icons/ai";
import { MdOutlineCardMembership } from "react-icons/md";
import { MdOutlineManageHistory } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";
import { MdOutlineAutorenew } from "react-icons/md";


const Sidebar = () => {

  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <nav>
        

        <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h1 className="title">Membership Management System</h1>
        <hr />
          <ul>
            <li><NavLink to='dashboard'><AiFillDashboard/>Dashboard</NavLink></li>
            <li><NavLink to='add-type'><MdOutlineCardMembership/>Add Membership Type</NavLink></li>
            <li><NavLink to='view-type'><MdOutlineManageHistory/>Manage Membership Type</NavLink></li>
            <li><NavLink to='add-membership'><IoIosPersonAdd/>Add Members</NavLink></li>
            <li><NavLink to='manage-members'><MdManageAccounts/>Manage Members</NavLink></li>
            <li><NavLink to='renewal'><MdOutlineAutorenew/>Renewal</NavLink></li>
          </ul>
        </div>


      </nav>
      <main>
        <div className="toggle-btn-container">
          <button className={`toggle-btn ${!isOpen ? "tgl-btn-close" : ""}`} onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
        </div>
        
        <div className="child">
          <Outlet />
        </div>
        <footer>
          &copy; 2025 Satirtha
        </footer>
      </main>



    </>
  );
};

export default Sidebar;