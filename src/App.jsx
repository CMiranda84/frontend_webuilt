import { Routes, Route } from "react-router-dom";
import ProjectsPages from "./Pages/ProjectsPages";
import ProjectsDetailsPage from "./Pages/ProjectsDetailsPage";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import CreateProjectPage from "./Pages/CreateProjectPage";
import ProjectEditPage from "./Pages/ProjectEditPage";
import UserProfilePage from "./Pages/UserProfilePage";
import IsWorker from "./components/IsWorker";
import IsLoggedOut from "./components/IsLoggedOut";
import Navbar from "./components/Navbar";

import "./index.css";

function App() {
  return (
    <>
      {/* <header className="bg-blue-500 py-4">
        <h1 className="text-white text-3xl">HomePage</h1>
      </header> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route element={<IsLoggedOut />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/projects" element={<ProjectsPages />} />
        <Route path="/projects/:projectId" element={<ProjectsDetailsPage />} />

        <Route element={<IsWorker />}>
          <Route path="/newProject" element={<CreateProjectPage />} />
          <Route
            path="/projects/:projectId/:editProject"
            element={<ProjectEditPage />}
          />
        </Route>
        <Route path="/userProfile/:userId" element={<UserProfilePage />} />
      </Routes>
      <footer className="bg-blue-500 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 My Website. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
