import { useEffect, useState } from "react";
import { Header } from "./Header.jsx";
import { getDataListOptions } from "../services/getDataListOptions.js";
import { insertStock } from "../services/insertStock.js";
import { getUserStocks } from "../services/getUserStocks.js";
import { deleteUserStock } from "../services/deleteUserStock.js";

export function MyStocks () {
    const [search, setSearch] = useState('')
    const [stockList, setStocklist] = useState(null)
    const [userStocks, setUserStocks] = useState(null)
    const [errorAddSymbol, setErrorAddSymbol] = useState(null)

    const handleChangeStockSearch = (event) => {
        setSearch(event.target.value)
    }

    useEffect(() => {
        getDataListOptions().then((response) => setStocklist(response))
    }, [])

    useEffect(() => {
        getUserStocks().then((response) => {
            if (response.status == 200) {
                setUserStocks(response.data)
            }
        })
    }, [])

    const handleDeleteUserStock = (stockSymbol) => {
        deleteUserStock(stockSymbol).then((response) => {
            if(response.status == 200) {
                setUserStocks((prevState) => ({
                    stocks: prevState.stocks.filter((stock) => stock.symbol !== stockSymbol)
            }))
            }
        })
    }

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
    
    return (
        <div className="container-fluid">
            <Header />
            <div className="row">
                <div className="col-lg-7 my-2 mx-auto">
                    <div className="card card-body">
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
                        
                        {
                            userStocks != null
                            ?
                                (
                                    <div className="table-responsive my-2">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Symbol</th>
                                                    <th>Name</th>
                                                    <th>Currency</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    userStocks.stocks.map((stock) => (
                                                        <tr key={stock.name}>
                                                            <td><a href={`/stock/${stock.symbol}`}>{stock.symbol}</a></td>
                                                            <td>{stock.name}</td>
                                                            <td>{stock.currency}</td>
                                                            <td><button onClick={() => handleDeleteUserStock(stock.symbol)} className="btn btn-secondary">Delete</button></td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            : <p>User has no stocks.</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}