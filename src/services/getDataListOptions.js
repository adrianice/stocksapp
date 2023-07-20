import axios from 'axios'

export async function getDataListOptions () {
    try{
        const response = await axios.get(`https://api.twelvedata.com/stocks`,
        {
            params: {
                source: 'docs',
                exchange: 'NYSE'
            }
        })

        return response.data.data
    }
    catch(err) {
        console.log(err.message)
    }
}