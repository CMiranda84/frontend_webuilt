import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import db_URL from "../Interceptor/myApi";
import useAuth from "../context/useAuth";
import Loader from "../components/Loader/Loader";
// import axios from "axios";
// const db = "http://localhost:5005/api"

function ProjectsDetailsPage() {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();
  const [comments, setComments] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    fetchProject();
  }, []);

  async function handleCommentSubmit(e) {
    e.preventDefault();
    try {
      const commentToSend = { text: commentContent };
      const response = await db_URL.post(
        `/comments/${projectId}`,
        commentToSend
      );
      console.log(response);
      // Adicionando o novo comentário à lista de comentários após o envio bem-sucedido
    // const newComment = response.data; // Supondo que o novo comentário retornado pelo backend contenha todos os detalhes, incluindo o ID
    // setComments([...comments, newComment]); // Adicionando o novo comentário à lista de comentários existente
    fetchProject() //isto tambem como a opcao acima pd adicionar o comentario automaticamente sem fazer reload da pagina 
    setCommentContent(""); // Limpando o conteúdo do campo de comentário após o envio bem-sucedido
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchProject() {
    try {
      const { data } = await db_URL.get(/projects/ + projectId);
      setProject(data.oneProject);
      setComments(data.comments);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  function handleDeleteComment(id) {
    return async () => {
      try {
        const response = await db_URL.delete("/comments/" + id);
        console.log(response);
        // Remove the deleted comment  to the  list after deletion
    // const updatedComments = comments.filter(comment => comment._id !== id);
    // setComments(updatedComments);
    fetchProject()  
      } catch (error) {
        console.log(error);
      }
    };
  }
  if (!project) {
    return <Loader/>
  }
  return (
    <div className="m-7">
      <div className="container mx-auto px-4 py-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
          <div className="flex items-center mb-4 " >
            <img
              src={project.image}
              alt={`image of ${project.title}`}
              className="w-72 h-52 rounded-lg shadow-md mr-7 hover:scale-125"
            />
            <div>
              <p className="text-lg text-gray-700 mb-2">
                {project.description}{" "}
              </p>
              <p className="text-gray-600">Budget: {project.price}€ </p>
              <p className="text-gray-600">Day(s) to complete: {project.duration}day(s) </p>
              <p className="text-gray-600">Company: {project.company} </p>
              <Link to={`/user/${project.user}`}>
              <p >Published by:  </p>
              <h3 className=" text-blue-800 hover:text-blue-400 ">{project.company}</h3>
              </Link>
            </div>
          </div>
          <Link to={`/projects/${project._id}/editProject`}>
            <button className="bg-green-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Edit  Project</button>
          </Link>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <>
        <form className="mb-8" onSubmit={handleCommentSubmit}>
          <textarea
            className="border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Write your comment here..."
            name="comment"
            id="comment"
            cols="30"
            rows="5"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Submit comment
          </button>
        </form>
      </>
      {comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        <>
          {comments.map((comment) => {
            // console.log(comment);
            const canComment =
              user && (comment.user._id === user._id || user.role === "worker");
            return (
              <div
                key={comment._id}
                className="bg-gray-100 rounded-lg p-4 mb-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold">{comment.user?.email}</p>

                  {/* {canDelete && (
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={handleDeleteComment(comment._id)}
                    >
                      🗑️
                    </button>
                  )} */} 
                  <button
                      className="text-red-500 hover:text-red-700"
                      onClick={handleDeleteComment(comment._id)}
                    >
                      Delete
                    </button>
                  
                </div>
                <p>{comment.text}</p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default ProjectsDetailsPage;
