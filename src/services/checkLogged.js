import axios from 'axios'
import { apiRoute } from './apiRoute.js'

export async function checkLogged () {
    const token = localStorage.getItem('token')
    if (token == null ) return false

    try{
        const response = await axios.post(`${apiRoute}/api/checkLogged`, {token: token})
        return response.data.logged
    }
    catch(err) {
        console.log(err.message)
    }
}