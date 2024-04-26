import React from "react"
import useAuth from "../context/useAuth"
import { Navigate, Outlet } from "react-router-dom"
import Loader from "./Loader/Loader"

function IsLoggedOut() {
	const { isLoggedIn, isLoading } = useAuth()

	if (isLoading) {
		return <Loader/>
	}

	if (isLoggedIn) {
		return <Navigate to={"/"} />
	}

	return <Outlet />
}

export default IsLoggedOut
