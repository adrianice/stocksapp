import axios from 'axios'
import { apiRoute } from './apiRoute.js'

export async function login (newUser) {
    try{
        const response = await axios.post(`${apiRoute}/api/login`, newUser, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    }
    catch(err) {
        console.log(err.message)
    }
}