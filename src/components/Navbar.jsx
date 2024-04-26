import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../context/useAuth'
import {React, useState, useContext } from 'react'
import Avatar from './avatar'
import { AuthContext } from '../context/AuthContextWrapper'
import logo from "../assets/logoWebuild.png"

function Navbar() {
const {isLoggedIn, logout} = useAuth()
const nav = useNavigate()
const location = useLocation
const { user } = useContext(AuthContext);

const handleLogout = async () => {
    try {
      await logout() // Certifica-se de que o logout seja concluído antes do redirecionamento
      nav('/login') // Redireciona para a página de login
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }
    
  return (

    <div className="bg-gray-800 text-white  py-2 px-10 flex justify-between items-center">
        <div className="logo-container">
			<Link to={"/"}>
        <img src={logo} alt="WeBuIlD Logo" className="logo hover:animate-spin " style={{ width: '90px', height: '40px' }} />
			</Link>
      </div>
        <nav>
			<ul className="flex space-x-4">
				<li>
					<Link to={"/"} className="hover:text-gray-300">Home</Link>
				</li>
				<li>
					{/* <Link to={"/projects"} className="hover:text-gray-300">All Projects</Link> */}
				</li>
				{isLoggedIn ? (
					<>
						<li>
							<button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
						</li>
						<li>
						<Link to={`/user/${user._id}`} className={location.pathname === `/user/${user._id}` ? "active" : ""} ><Avatar /></Link>
							
						</li>
					</>
				) : (
					<>
						<li>
							<Link to={"/signup"} className="hover:text-gray-300">Signup</Link>
						</li>
						<li>
							<Link to={"/login"} className="hover:text-gray-300">Login</Link>
						</li>
					</>
				)}
			</ul>
		</nav>

        </div>
  )
}

export default Navbar