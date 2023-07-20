import axios from 'axios'
import { apiRoute } from './apiRoute.js'
import jwt_decode from 'jwt-decode'

export async function getUserStocks () {
    const token = window.localStorage.getItem('token')
    const decodedToken = jwt_decode(token)
    const id = decodedToken._id
    
    try{
        const response = await axios.get(`${apiRoute}/api/getUserStocks`, {
            headers: {
                'Authorization': token
            },
            params: {
                _id: id
            }
        })

        return response
    }
    catch(err) {
        console.log(err.message)
    }
}