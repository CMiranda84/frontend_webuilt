import axios from "axios"

const db_URL = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
})
// const db_URL = axios.create({
// 	baseURL:"http://localhost:5005/api",
// })

/// this is to intercept the request before get sent to the server
/// para adicionar automaticamente um cabeçalho de autorização com 
/// um token de autenticação antes de cada solicitação HTTP

db_URL.interceptors.request.use((request) => {
	const token = localStorage.getItem("token")
	if (!token) {
		return request
	}
	request.headers.Authorization = `Bearer ${token}`
	return request
})

export default db_URL
