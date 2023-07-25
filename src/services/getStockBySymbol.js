import axios from "axios";

export async function getStockBySymbol (Symbol) {
    try {
        const response = await axios.get(`https://api.twelvedata.com/stocks`,
        {
            params: {
                source: 'docs',
                exchange: 'NYSE',
                symbol: Symbol
            }
        })

        return response.data.data
    }
    catch (err) {
        console.log(err.message)
    }
}