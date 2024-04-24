import React from "react";
import db_URL from "../Interceptor/myApi";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from 'axios';
// const db_URL = "http://localhost:5005/api";

function ProjectsPages() {
  const [projects, setProjects] = useState(null);
  const [searchString, setSearchString] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, [searchString]);

  async function fetchProjects() {
    try {
      const { data } = await db_URL.get("/projects?name_like=" + searchString);
      // const response = await db_URL.get("/projects?name_like=" + searchString)
      setProjects(data);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  }
  function handleSearch(event) {
    const value = event.target.value;
    setSearchString(value)
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => {
      setSearchString(value);
    }, 500);
    setTimeoutId(id)
  }

  if (!projects) {
    return "no projects to display";
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">All Projects</h1>
      <div>
        <input
           className="inputSearch border border-gray-300 focus:border-indigo-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          type="text"
          placeholder="Search projects by Title"
          onChange={handleSearch}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          return (
            <div key={project._id} className="project-card bg-white rounded-lg shadow-md">
              <h2>
                <Link to={`/projects/${project._id}`} className="hover:text-blue-600">{project.title}</Link>
              </h2>
              <div className="img-wrapper">
                <img
                  src={project.image}
                  alt={`image of ${project.title} project`}
                  className="w-full h-auto rounded-t-lg"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectsPages;
