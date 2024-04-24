import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../context/useAuth'
import {React, useState } from 'react'

function Navbar() {
const {isLoggedIn, logout} = useAuth()
const nav = useNavigate()

const handleLogout = async () => {
    try {
      await logout() // Certifica-se de que o logout seja concluído antes do redirecionamento
      nav('/login') // Redireciona para a página de login
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }
    
  return (

    <div className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">WeBuIlD</h1>
        <nav>
			<ul className="flex space-x-4">
				<li>
					<Link to={"/"} className="hover:text-gray-300">Home</Link>
				</li>
				<li>
					<Link to={"/projects"} className="hover:text-gray-300">All Projects</Link>
				</li>
				{isLoggedIn ? (
					<>
						<li>
							<button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
						</li>
						{/* <li>
							<Avatar small />
							<Avatar />
						</li> */}
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