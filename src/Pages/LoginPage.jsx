import { useState } from "react";
import db_URL from "../Interceptor/myApi";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
// import axios from "axios";
// const db_URL = "http://localhost:5005/api";

function LoginPage() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const { storeToken, authenticateUser } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value;
    setFormState({ ...formState, [key]: value });
  }
  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      const response = await db_URL.post("/auth/login", formState);
      console.log(response);
      const token = response.data.authToken;
      storeToken(token);
      await authenticateUser();
      navigate("/");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <p style={{ color: "red" }}>{error}</p>

        <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <label className="sr-only" htmlFor="email">
              Email:{" "}
            </label>
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              type="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <button 
          type="submit"
           className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
             Submit
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
          Don't have an account?{" "} <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
