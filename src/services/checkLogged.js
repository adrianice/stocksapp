import axios from 'axios'
import { apiRoute } from './apiRoute.js'

export async function checkLogged () {
    try{
        const response = await axios.get(`${apiRoute}/api/checkLogged`)
        return response.data
    }
    catch(err) {
        console.log(err.message)
    }
}