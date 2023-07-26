import { useState, useEffect } from "react"
import { getDataListOptions } from "../services/getDataListOptions.js"
import { insertStock } from "../services/insertStock.js";

export function SearchSymbol ({setUserStocks}) {
    const [search, setSearch] = useState('')
    const [errorAddSymbol, setErrorAddSymbol] = useState(null)
    const [stockList, setStocklist] = useState(null)

    useEffect(() => {
        getDataListOptions().then((response) => setStocklist(response))
    }, [])

    const handleAddSymbol = (event) => {
        event.preventDefault()

        if (stockList != null) {
            const stock = stockList.find(obj => obj.symbol === search.toUpperCase())

            if (stock) {
                insertStock(stock).then((response) => {
                    if (response.status == 200) {
                        setErrorAddSymbol(null)

                        setUserStocks((prevState) => ({
                                stocks: [...prevState.stocks, stock]
                        }))
                    }
                    else {
                        setErrorAddSymbol(response.data.error)
                    }
                })
                
            }
            else {
                setErrorAddSymbol('Symbol not found.')
            }
        }
    }

    const handleChangeStockSearch = (event) => {
        setSearch(event.target.value)
    }

    return (
        <div className="row">
                            <div className="col-lg-6">
                                <div className="input-group mb-3 my-2">
                                <input className="form-control" list="datalistOptions" placeholder="Search stock symbol" value={search} onChange={handleChangeStockSearch}/>
                                    <datalist id="datalistOptions">
                                        {
                                            stockList != null
                                            ?
                                            stockList.map((stock)=> (<option key={stock.symbol}>{stock.symbol}</option>))
                                            : ''
                                        }
                                    </datalist>
                                <button onClick={handleAddSymbol} className="btn btn-outline-secondary">Add symbol</button>
                                </div>
                                
                            </div>
                            {
                                errorAddSymbol != null
                                ?
                                (
                                    <div className="col-lg-6 my-auto">
                                        <p className="text-danger">
                                            {errorAddSymbol}
                                        </p>
                                    </div>
                                )
                                : ''
                            }
                            
                        </div>
    )
}