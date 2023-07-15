import axios from 'axios'
import { apiRoute } from './apiRoute.js'

export async function logout() {
    try{
        const response = await axios.get(`${apiRoute}/api/logout`)
        return response.data
    }
    catch(err) {
        console.log(err.message)
    }
}