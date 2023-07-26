import { logout } from "../services/logout"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { HeaderButtons } from "./HeaderButtons"
import jwt_decode from 'jwt-decode'

export function Header ({log = false}) {
    const [logged] = useState(log)
    const [username, setUsername] = useState(null)
    const navigate = useNavigate()

    const handleClickLogout = () => {
        logout()
        navigate('/login')
    }
    
    useEffect(() => {
        if (logged) {
            const token = localStorage.getItem('token')
            const decodedToken = jwt_decode(token)
            const username = decodedToken.username
            setUsername(username)
        }
    }, [])

    return (
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">MY STOCKS</a>
                <div className="d-flex">
                    <HeaderButtons logged={logged} handleClickLogout={handleClickLogout} username={username}/>
                </div>
            </div>
        </nav>
    )
}