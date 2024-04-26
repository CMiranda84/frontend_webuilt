import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/bgImage.png"
import "./HomePage.css"

function HomePage() {
  return (
    <div className="backgroundImage" >

    <div className="bodyContainer   items-center ">
          <div className="text-center cardGroup w-40 rounded-sm group grid place-items-center h-32">
            
            <Link className="smallCardd" id="cds20" to="/newProject">
              <div className="h-8 w-40 rounded-lg group-hover:translate-x-24  group-hover:translate-y-12 group-hover:rotate-90 duration-150" >
                <h1 className="bg-gray-800  rounded-lg text-white hover:scale-125 hover:bg-green-600  content-titlee text-xlg font-semibold">Add Project</h1>
              </div>
            </Link>
            <Link className=" smallCardd" id="cds30" to="/projects">
              <div className="h-8 w-40  group-hover:-translate-y-14 duration-200">
                <h2 className="bg-gray-800 rounded-lg text-white hover:scale-125 hover:bg-green-600 content-titlee">All projects</h2>
              </div>
            </Link>
            <Link className="smallCardd" id="cds40" to="/about">
              <div className="h-8 w-40 group-hover:translate-y-14 duration-300">
                <h2 className="bg-gray-800 rounded-lg text-white hover:scale-125 hover:bg-green-600  content-titlee">About Us</h2>
              </div>
            </Link>
            <Link className="smallCardd" id="cds40" to="/contacts">
              <div className="h-8 w-40 group-hover:-translate-x-24 group-hover:-translate-y-12 group-hover:-rotate-90 duration-500">
                <h2 className="bg-gray-800 rounded-lg text-white hover:scale-125 hover:bg-green-600  content-titlee">Talk to us</h2>
              </div>
            </Link>
        </div>
        
      </div>
      </div> 
   
  );
}

export default HomePage;
