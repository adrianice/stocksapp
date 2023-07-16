import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "./Header.jsx"
import { login } from "../services/login.js"

export function Login () {
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()

    const handleLoginSubmit = (event) => {
        event.preventDefault()

        const data = event.target.elements

        const newUser = {
            username: data.username.value,
            password: data.password.value
        }

        login(newUser).then((response) => {
            console.log(response)
            if(response.status == 200) {
                localStorage.setItem('token', response.data.token)
                navigate('/')
            }
            else {
                setMessage({message: response.data.error + '.', color: 'text-danger'})
            }
        })

    }

    return (
        <div className="container-fluid">
            <Header />
            <div className="row">
                <div className="col-lg-3 mx-auto my-4">
                    <h3 className="text-center">Log in</h3>
                    <div className="card card-body">
                        <form onSubmit={handleLoginSubmit}>
                            <input name="username" type="text" placeholder="Username" className="form-control my-3" required/>
                            <input name="password" type="password" placeholder="Password" className="form-control my-3" required/>
                            <button type="submit" className="btn btn-primary w-100">Log in</button>
                        </form>
                    </div>
                    {
                        message && (
                            <div className="text-center my-1">
                                <p className={message.color}>{message.message}</p>
                            </div>
                        )
                    }
                    <p className="text-center my-1">Don't have an account? click <a href="/signin">here</a></p>
                </div>
            </div>
        </div>
    )
}