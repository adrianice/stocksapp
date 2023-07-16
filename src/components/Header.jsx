import { logout } from "../services/logout"
import { checkLogged } from "../services/checkLogged.js"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { HeaderButtons } from "./HeaderButtons"
import jwt_decode from 'jwt-decode'

export function Header () {
    const [logged, setLogged] = useState(null)
    const [username, setUsername] = useState(null)
    const navigate = useNavigate()

    const handleClickLogout = () => {
        logout()
        navigate('/login')
    }
    
    useEffect(() => {
        checkLogged().then((response) => {
            setLogged(response)
            if (response) {
                const token = localStorage.getItem('token')
                const decodedToken = jwt_decode(token)
                const username = decodedToken.username
                setUsername(username)
            }
        })
    }, [])

    return (
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">MY STOCKS</a>
                <div className="d-flex">
                    {
                        logged !== null
                        ? <HeaderButtons logged={logged} handleClickLogout={handleClickLogout} username={username}/>
                        : ''
                    }
                    
                </div>
            </div>
        </nav>
    )
}