import axios from 'axios'
import { apiRoute } from './apiRoute.js'
import jwt_decode from 'jwt-decode'

export async function deleteUserStock (Symbol) {
    const token = window.localStorage.getItem('token')
    const decodedToken = jwt_decode(token)
    const id = decodedToken._id
    
    try{
        const response = await axios.delete(`${apiRoute}/api/deleteUserStock`, {
            headers: {
                'Authorization': token
            },
            params: {
                _id: id,
                symbol: Symbol
            }
        })

        return response
    }
    catch(err) {
        console.log(err.message)
    }
}