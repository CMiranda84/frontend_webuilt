import React from "react"
import useAuth from "../context/useAuth"
import { Navigate, Outlet } from "react-router-dom"

function IsWorker() {
	const { isLoggedIn, isLoading, user } = useAuth()

	if (isLoading) {
		return <p>Loading :)</p>
	}

	if (!isLoggedIn) {
		return <Navigate to={"/login"} />
	}

	if (user.role !== "worker") {
		return <Navigate to="/" />
	}

	return <Outlet />
}

export default IsWorker
