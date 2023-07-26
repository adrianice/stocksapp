import { Link } from "react-router-dom";
import { deleteUserStock } from "../services/deleteUserStock.js";
import { useEffect, useState } from "react";

export function UserStocksTable ({userStocks, setUserStocks}) {
    const [maxPage, setMaxPage] = useState(Math.ceil(userStocks.stocks.length / 5))
    const [page, setPage] = useState(1)
    const [sliceUserStocks, setSliceUserStocks] = useState(page === maxPage ? userStocks.stocks : userStocks.stocks.slice(0, 5))
    
    useEffect(() => {
        const newMax = Math.ceil(userStocks.stocks.length / 5) !== 0 ? Math.ceil(userStocks.stocks.length / 5) : 1
        setMaxPage(newMax)
        
        if (page > newMax) {
            setPage((prevState) => prevState - 1)
        }
        else if (page === newMax) {
            setSliceUserStocks(userStocks.stocks.slice((page - 1) * 5, userStocks.stocks.length))
        }

    },[userStocks])

    useEffect(() => {
        if (page < 1) {
            setPage(1)
        }
        else if (page > maxPage) {
            setPage(maxPage)
        }


        if (page === maxPage) {
            setSliceUserStocks(userStocks.stocks.slice((page - 1) * 5, userStocks.stocks.length))
        }
        else {
            setSliceUserStocks(userStocks.stocks.slice((page - 1) * 5, page * 5))
        }
    },[page])

    const handlePaginationLeft = () => {
        setPage((prevState) => prevState - 1)
    }

    const handlePaginationRight = () => {
        setPage((prevState) => prevState + 1)
    }

    const encodeSymbol = (symbol) => {
        return symbol.replace(/\./g, "_")
    }

    const handleDeleteUserStock = (stockSymbol) => {
        deleteUserStock(stockSymbol).then((response) => {
            if(response.status == 200) {
                setUserStocks((prevState) => ({
                    stocks: prevState.stocks.filter((stock) => stock.symbol !== stockSymbol)
            }))
            }
        })
    }

    return (
        <>
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
                            sliceUserStocks.map((stock) => (
                                <tr key={stock.symbol}>
                                    <td><Link to={`/stock/${encodeSymbol(stock.symbol)}`}>{stock.symbol}</Link></td>
                                    <td>{stock.name}</td>
                                    <td>{stock.currency}</td>
                                    <td><button onClick={() => handleDeleteUserStock(stock.symbol)} className="btn btn-secondary">Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="row">
                <div className="col-lg-4 mx-auto">
                    <div className="d-flex justify-content-center">
                    <ul className="pagination mx-auto">
                            <li className={page === 1 ? "page-item disabled" : "page-item"}>
                                <button className="page-link" onClick={handlePaginationLeft}>&laquo;</button>
                            </li>
                            <li className="page-item mx-2 my-auto">
                                {page} out of {maxPage}
                            </li>
                            <li className={page === maxPage ? "page-item disabled" : "page-item"}>
                                <button className="page-link" onClick={handlePaginationRight}>&raquo;</button>
                            </li>
                        </ul>
                    </div>
                        
                </div>
            </div>
        </>
        
    )
}