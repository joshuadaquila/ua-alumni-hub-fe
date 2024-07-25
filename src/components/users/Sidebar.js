import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faBarChart, faBars, faBroadcastTower, faCalendarAlt, faDashboard, faGraduationCap, faHandPaper, faMessage, faPaperclip, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ualogo from "../../resources/ualogo.jpg";

const Sidebar = ({ handleClick }) => {
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);
  const handleTrigger = () => {
    showSidebar();
    handleClick();
  }

  return (
    <div className={`fixed top-0 left-0 h-screen z-50 ${sidebar ? "mr-[64]" : ""}`}>
      <div className={`rounded-full`}>
        <Link to="#" className={` items-center justify-center h-12 w-12 rounded-full cursor-pointer" ${sidebar ? "hidden" : "flex"}`}  >
          <FontAwesomeIcon icon={faBars} className=" text-2xl " onClick={handleTrigger} />
        </Link>
        
        <nav className={`absolute top-0 left-0 h-screen w-64 bg-slate-900
         text-white transition opacity duration-300 ease-in-out shadow-md ${sidebar ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"}`}>
          <div className="flex flex-col justify-center items-center ">
            <img src={ualogo} className="rounded-full p-12 "/>
            <p className="text-xl font-bold p-4">Alumni Hub</p>
          </div>
          <ul className="flex flex-col py-4 text-left">
            <li className="nav-item m-2 hover:bg-white hover:text-black">
              <Link to="/admin/dashboard" className="font-bold flex items-center">
                <FontAwesomeIcon icon={faDashboard} className="mr-2" />
                Dashboard
              </Link>
            </li>
            <li className="nav-item m-2 hover:bg-white hover:text-black">
              <Link to="/admin/alumni" className="font-bold flex items-center">
                <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
                Alumni
              </Link>
            </li>
            <li className="nav-item m-2 hover:bg-white hover:text-black">
              <Link to="/admin/users" className="font-bold flex items-center">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Users
              </Link>
            </li>
            <li className="nav-item m-2 hover:bg-white hover:text-black">
              <Link to="/admin/events" className="font-bold flex items-center">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                Events
              </Link>
            </li>
            <li className="nav-item m-2 hover:bg-white hover:text-black">
              <Link to="/admin/messagebroadcast" className="font-bold flex items-center">
                <FontAwesomeIcon icon={faBroadcastTower} className="mr-2" />
                Community Messagebox
              </Link>
            </li>
            <li className="nav-item m-2 hover:bg-white hover:text-black">
              <Link to="/admin/survey" className="font-bold flex items-center">
                <FontAwesomeIcon icon={faPaperclip} className="mr-2" />
                Graduate Tracer Survey Summary
              </Link>
            </li>
            <li className="nav-item m-2 hover:bg-white hover:text-black">
              <Link to="/admin/demographic" className="font-bold flex items-center">
                <FontAwesomeIcon icon={faBarChart} className="mr-2" />
                Demographic Insights
              </Link>
            </li>
            <li className="nav-item m-2 hover:bg-white hover:text-black">
              <Link to="/about-us" className="font-bold flex items-center">
                <FontAwesomeIcon icon={faBarChart} className="mr-2" />
                Employment Insights
              </Link>
            </li>
          </ul>

          <Link to="#" className="absolute top-0 right-0 p-4 text-white" onClick={handleTrigger}>
            <FontAwesomeIcon icon={faTimes} className="text-white text-2xl" />
          </Link>
        </nav>
      </div>
      
    </div>
  );
};

export default Sidebar;