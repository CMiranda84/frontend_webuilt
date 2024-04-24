import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import db_URL from "../Interceptor/myApi";
import { AuthContext } from "../context/AuthContextWrapper";

function CreateProjectPage() {
  // const [project, setProject] = useState();
  const navigate = useNavigate();
  const [file, setFile] = useState("")
  const {user} = useContext(AuthContext)

  // if(!user || user.role !== "worker") {
  //   navigate("/")
  //   return "you are not a Worker"
  // }

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  const handleTitle = (e) => setTitle(e.target.value);
  const handleImage = (e) => setImage(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleCompany = (e) => setCompany(e.target.value);
  const handlePrice = (e) => setPrice(e.target.value);
  const handleDuration = (e) => setDuration(e.target.value);

  // const handleChange = (e) => {
  //   const { title, image, description, company, price, duration } = e.target.value;
  //   setProject({ ...formState, [key]: value });
  // };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // const newProject = {
      //   title,
      //   image,
      //   description,
      //   company,
      //   price,
      //   duration,
      // };
      const formDt = new FormData()
    formDt.append("title", title);
    formDt.append("description", description);
    formDt.append("company", company);
    formDt.append("price", price);
    formDt.append("duration", duration);
    formDt.append("image", file);

      const response = await db_URL.post("/projects", formDt);
      console.log(response);
      navigate("/projects");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-3xl font-bold mb-4">Add Projects</div>
      <div>
        <form className="creationBody" onSubmit={handleCreate}>
          <div className="mb-4">
            <label className="block mb-2">Title</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              name="title"
              placeholder="project name"
              value={title}
              onChange={handleTitle}
            />
          </div>
          <div className="mb-4">
            <label className="mb-4">Company</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              name="company"
              placeholder="company name"
              value={company}
              onChange={handleCompany}
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
              value={description}
              onChange={handleDescription}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Price</label>
            <input
              className="w-full p-2 border rounded"
              type="number"
              name="price"
              placeholder="budjet€"
              value={price}
              onChange={handlePrice}
              min={0}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Duration</label>
            <input
              className="w-full p-2 border rounded"
              type="number"
              name="duration"
              placeholder="how long it takes to be done?"
              value={duration}
              onChange={handleDuration}
              min={0}
            />
          </div>
          <div className="mb-4">
					<label htmlFor="file"  className="block text-gray-700 font-bold mb-2">Project picture: </label>
					<input
          className="input-field"
						type="file"
						id="file"
            // name="images[]" // Definindo o atributo name como "images[]"
						onChange={(e) => {
							setFile(e.target.files[0])
						}}
					/>
				</div>
          {/* <div className="mb-4">
            <label className="block mb-2">Image</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              name="image"
              placeholder="project Images"
              value={image}
              onChange={handleImage}
            />
          </div> */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProjectPage;
