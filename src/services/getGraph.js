import axios from "axios";

export async function getGraph (symbol, interval, startDate, endDate) {
    const apiKey = '105238777d9646b4873a470203500cdb'

    try {
        const response = await axios.get(`https://api.twelvedata.com/time_series`,
        {
            params: {
                symbol,
                interval,
                start_date: startDate,
                end_date: endDate,
                apikey: apiKey
            }
        })

        return response.data
    }
    catch (err) {
        console.log(err.message)
    }
}