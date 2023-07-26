import { useEffect, useState } from "react";
import { Header } from "./Header.jsx";
import { getUserStocks } from "../services/getUserStocks.js";
import { SearchSymbol } from "./SearchSymbol.jsx";
import { UserStocksTable } from "./UserStocksTable.jsx";

export function MyStocks () {
    const [userStocks, setUserStocks] = useState(null)

    useEffect(() => {
        getUserStocks().then((response) => {
            if (response.status == 200) {
                setUserStocks(response.data)
            }
        })
    }, [])

    return (
        <div className="container-fluid">
            <Header log={true}/>
            <div className="row">
                <div className="col-lg-7 my-2 mx-auto">
                    <div className="card card-body">
                        
                        <SearchSymbol setUserStocks={setUserStocks}/>
                        
                        {
                            userStocks && userStocks.stocks.length > 0
                            ?
                                (
                                    <UserStocksTable userStocks={userStocks} setUserStocks={setUserStocks}/>
                                )
                            : <p>User has no stocks.</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}