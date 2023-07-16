import { createBrowserRouter } from "react-router-dom";
import { Login } from './Login.jsx'
import { MyStocks } from "./MyStocks.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { Signin } from './Signin.jsx'

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute element={MyStocks} />,
    },
    {
        path: '/login',
        element: <ProtectedRoute element={Login} guestOnly={true}/>,
    },
    {
        path: '/signin',
        element: <ProtectedRoute element={Signin} guestOnly={true}/>,
    }
])