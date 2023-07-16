import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "./Header.jsx"
import { signin } from "../services/signIn.js"

export function Signin () {
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()

    const handleSignInSubmit = (event) => {
        event.preventDefault()
        const data = event.target.elements

        if (data.password.value != data.confirmpassword.value) return setMessage({message: 'Passwords does not match.', color: 'text-danger'})
        
        const newUser = {
            username: data.username.value,
            password: data.password.value,
            name: data.name.value
        }

        signin(newUser).then((response) => {
            if(response.status == 201) {
                setMessage({message: 'User successfully registered.', color: 'text-success'})

                setTimeout(()=> {
                    navigate('/login')
                }, 2000)
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
                    <h3 className="text-center">Sign in</h3>
                    <div className="card card-body">
                        <form onSubmit={handleSignInSubmit}>
                            <input name="name" type="text" placeholder="Full name" className="form-control my-3" required/>
                            <input name="username" type="text" placeholder="Username" className="form-control my-3" required/>
                            <input name="password" type="password" placeholder="Password" className="form-control my-3" required/>
                            <input name="confirmpassword" type="password" placeholder="Confirm password" className="form-control my-3" required/>
                            <button type="submit" className="btn btn-primary w-100">Register</button>
                        </form>
                    </div>
                    {
                        message && (
                            <div className="text-center my-1">
                                <p className={message.color}>{message.message}</p>
                            </div>
                        )
                    }
                    <p className="text-center my-1">Already have an account? click <a href="/login">here</a></p>
                </div>
            </div>
        </div>
    )
}