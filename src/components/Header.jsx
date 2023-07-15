import { logout } from "../services/logout"
import { checkLogged } from "../services/checkLogged.js"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { HeaderButtons } from "./HeaderButtons"

export function Header () {
    const [logged, setLogged] = useState(null)
    const navigate = useNavigate()

    const handleClickLogout = () => {
        logout().then((response) => navigate('/'))
    }
    
    useEffect(() => {
        checkLogged().then((response) => {
            setLogged(response)
        })
    }, [])

    return (
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">MY STOCKS</a>
                <div className="d-flex">
                    {
                        logged 
                        ? <HeaderButtons logged={logged} handleClickLogout={handleClickLogout}/>
                        : ''
                    }
                    
                </div>
            </div>
        </nav>
    )
}