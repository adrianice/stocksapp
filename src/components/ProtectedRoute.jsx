import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkLogged } from "../services/checkLogged";

export function ProtectedRoute ({element: Component, guestOnly}) {
    const navigate = useNavigate()
    const [verificationComplete, setVerificationComplete] = useState(false);

    useEffect(()=> {
        async function checkAuthentication() {
            const logged = await checkLogged()

            if(guestOnly && logged) {
                navigate('/')
            }
            else if(!guestOnly && !logged) {
                navigate('/login')
            }

            setVerificationComplete(true)
        }

        checkAuthentication()

    }, [navigate])

    if(!verificationComplete) {
        return null
    }

    return <Component />
}