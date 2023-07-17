import { useState } from "react";
import { Header } from "./Header.jsx";

export function MyStocks () {
    const [search, setSearch] = useState(null)

    const handleChangeStockSearch = (event) => {
        setSearch(event.target.value)
    }
    
    return (
        <div className="container-fluid">
            <Header />
            <div className="row">
                <div className="col-lg-7 my-2 mx-auto">
                    <div className="card card-body">
                    <form>

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="input-group mb-3 my-2">
                                <input className="form-control" list="datalistOptions" placeholder="Search stock symbol" value={search} onChange={handleChangeStockSearch}/>
                                    <datalist id="datalistOptions">
                                        <option>TSLA</option>
                                    </datalist>
                                <button className="btn btn-outline-secondary">Add symbol</button>
                                </div>
                            </div>
                        </div>
                        
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
                                    <tr>
                                        <td><a href="#">TSLA</a></td>
                                        <td>Tesla Inc</td>
                                        <td>USD</td>
                                        <td><button className="btn btn-secondary">Delete</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}