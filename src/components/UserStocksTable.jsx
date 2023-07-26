import { Link } from "react-router-dom";
import { deleteUserStock } from "../services/deleteUserStock.js";

export function UserStocksTable ({userStocks, setUserStocks}) {
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
    )
}