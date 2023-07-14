import { createBrowserRouter } from "react-router-dom";
import { Login } from './Login.jsx'
import { Signin } from './Signin.jsx'

export const Router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signin',
        element: <Signin />,
    }
])