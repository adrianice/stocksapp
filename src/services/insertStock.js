import axios from 'axios'
import { apiRoute } from './apiRoute.js'
import jwt_decode from 'jwt-decode'

export async function insertStock (newStock) {
    const token = window.localStorage.getItem('token')
    const decodedToken = jwt_decode(token)
    const id = decodedToken._id
    
    try{
        const response = await axios.post(`${apiRoute}/api/insertStock`, {_id: id, stock: newStock}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        return response
    }
    catch(err) {
        console.log(err.message)
    }
}