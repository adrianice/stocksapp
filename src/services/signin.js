import axios from 'axios'
import { apiRoute } from './apiRoute.js'

export async function signin(newUser) {
    try{
        const response = await axios.post(`${apiRoute}/api/signin`, newUser, {
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