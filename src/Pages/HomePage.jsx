import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div >
      
      <main className="container mx-auto py-8">
        {/* <section className="text-center">
          <h2 className="text-2xl font-bold">About Us</h2>
          <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </section> */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-center">WEBUILD</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div className="bg-white p-4 shadow-md">
              <h3 className="text-lg font-semibold"><Link to={"/about"}>
          <h2 >About Us</h2>
        </Link></h3>
              <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="bg-white p-4 shadow-md">
              <h3 className="text-lg font-semibold"><Link to={"/projects"}>
          <h2 >All projects</h2>
        </Link></h3>
              <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="bg-white p-4 shadow-md">
              <h3 className="text-lg font-semibold"><Link to={"/newProject"}>
          <h2 >Add new Project</h2>
        </Link></h3>
              <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </section>
      </main>
    
    
    </div>
  );
}

export default HomePage;
