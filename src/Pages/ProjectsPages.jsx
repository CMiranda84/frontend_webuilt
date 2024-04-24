import React from "react";
import db_URL from "../Interceptor/myApi";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from 'axios';
// const db_URL = "http://localhost:5005/api";

function ProjectsPages() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const { data } = await db_URL.get("/projects");
      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  }
  if (!projects) {
    return "no projects to display";
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">All Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          return (
            <div key={project._id} className="project-card">
              <h2>
                <Link to={`/projects/${project._id}`}>{project.title}</Link>
              </h2>
              <div className="img-wrapper">
                <img
                  src={project.image}
                  alt={`image of ${project.title} project`}
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
