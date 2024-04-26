import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import db_URL from "../Interceptor/myApi";

// const defaultProject = {
//   title: "",
//   duration:"",
//   description:"",
//   company: "",
//   image: "",
//   price: 0,
//   }

function ProjectEditPage() {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const [editProject, setEditProject] = useState({
    title: "",
    image: "",
    description: "",
    company: "",
    price: 0,
    duration: 0,
  });

  useEffect(() => {
    db_URL
      .get(`/projects/${projectId}`)
      .then((response) => {
        setEditProject({
          title: response.data.oneProject.title,
          image: response.data.oneProject.image,
          description: response.data.oneProject.description,
          company: response.data.oneProject.company,
          price: response.data.oneProject.price,
          duration: response.data.oneProject.duration,
        });
        console.log(response.data.oneProject);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    console.log("changing", e.target.name, "to", e.target.value);
    setEditProject((prevEditProject) => ({
      ...prevEditProject,
      [e.target.name]: e.target.value,
    }));
  };
  // const handleChange = (e) => {
  //   setEditProject({ ...editProject, [e.target.name]: e.target.value });
  // };

  const handleEditProject = async (e) => {
    e.preventDefault();
    try {
      const response = await db_URL.put(`/projects/${projectId}`, editProject);
      console.log("Project updated:", response.data);
      setProject(response.data); // Atualiza o estado da propriedade com os novos dados
      navigate("/projects");
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = () => {
    db_URL
      .delete(`/projects/${projectId}`)
      .then(() => navigate(`/projects`))
      .catch((error) => console.log(error));
  };

  return (
    <div className="m-7">
      <h1 className="text-3xl font-bold mb-4">Edit this Project</h1>
      <div className="editionContainer space-x-3">
        <form className="editionBody" onSubmit={handleEditProject}>
          <div className="mb-4">
            <label className="block mb-2">Title</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              name="title"
              placeholder="Name of the project"
              value={editProject.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">company</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              name="company"
              placeholder="company who did the project"
              value={editProject.company}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              className="w-full p-2 border rounded"
              type="text"
              name="description"
              placeholder="description of the project "
              rows="3"
              value={editProject.description}
              onChange={handleChange}
            />{" "}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Price</label>
            <input
              className="w-full p-2 border rounded"
              type="number"
              name="price"
              placeholder="project budget in €"
              value={editProject.price}
              onChange={handleChange}
              min={0}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Image</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              name="image"
              placeholder="project Images"
              value={editProject.image}
              onChange={handleChange}
            />
          </div>
        </form>
        <img
          className="editImage w-96"
          src={editProject.image}
          alt={`image of ${editProject.title}`}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleEditProject}
        >
          Save changes
        </button>
        <button
          type="button"
          onClick={() => setShowDeleteConfirmation(true)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 transition duration-150 ease-in-out"
        >
          Delete
        </button>
        {showDeleteConfirmation && (
          <div className="absolute top-0 left-0 w-72 h-48 bg-white flex flex-col justify-center items-center border border-gray-300 rounded-md p-4 shadow-md">
            <p className="mb-4">
              Are you sure you want to delete this project?
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-green font-bold py-1 px-3 rounded transition duration-150 ease-in-out"
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-3 rounded transition duration-150 ease-in-out"
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectEditPage;
