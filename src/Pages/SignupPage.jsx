import { React, useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import db_URL from "../Interceptor/myApi";
// import axios from "axios";
// const db_URL = "http://localhost:5005/api";

function SignupPage() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const handleEmail = (e) => setEmail(e.target.value);
  // const handlePassword = (e) => setPassword(e.target.value);
  // const handleName = (e) => setName(e.target.value);
const [file, setFile] = useState(null)
  const nav = useNavigate();
  const [formState, setFormState] = useState({ email: "", password: "" });
	const [error, setError] = useState("")

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value;
    setFormState({ ...formState, [key]: value });
  }

  async function handleSignupSubmit(e) {
    e.preventDefault();
    try {
      const formDt = new FormData()
			formDt.append("email", formState.email)
			formDt.append("password", formState.password)
			formDt.append("image", file)
      const response = await db_URL.post(`/auth/signup`, formDt);
      console.log(response);
      if (response.status === 201) {
        nav("/login");
      }
    } catch (error) {
      console.log(error.message);
      setError(error.response?.data?.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }
  const { password, email } = formState;
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Sign Up</h2>

      <p style={{ color: "red" }}>{error}</p>

      <form className="max-w-md mx-auto" onSubmit={handleSignupSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email:{" "}
          </label>
          <input
            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Password:{" "}
          </label>
          <input
            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
					<label htmlFor="file"  className="block text-gray-700 font-bold mb-2">Profile picture: </label>
					<input
          className="input-field"
						type="file"
						id="file"
						onChange={(e) => {
							setFile(e.target.files[0])
						}}
					/>
				</div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignupPage;
