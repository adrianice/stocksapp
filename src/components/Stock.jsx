import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStockBySymbol } from "../services/getStockBySymbol.js";
import { Header } from "./Header.jsx";
import { useNavigate } from "react-router-dom";

export function Stock () {
    const navigate = useNavigate()
    const { symbol } = useParams();
    const [maxDate, setMaxDate] = useState('')
    const [stockInfo, setStockInfo] = useState(null)

    useEffect(() => {
        getStockBySymbol(symbol).then((response) => {
            if (response.length > 0) {
                setStockInfo(response)
            }
            else {
                navigate('/')
            }
        })
    }, [])

    useEffect(() => {
        const now = new Date().toISOString().slice(0, 16);
        setMaxDate(now)
    }, [])

    return (
        <div className="container-fluid">
            <Header />
            <div className="row">
                <div className="col-lg-12">
                    <p className="my-3">
                        {
                            stockInfo != null
                            ? `${stockInfo[0].symbol} - ${stockInfo[0].name} - ${stockInfo[0].currency}`
                            : ''
                        }
                    </p>
                    <hr />
                </div>
                <div className="col-lg-6 mx-auto">
                    <form action="">
                        <div className="card card-body">

                            <div className="row">
                                <div className="col-lg-3 my-auto">
                                    <input className="btn-check" type="radio" name="graph-selection" id="realtime"/>
                                    <label className="btn btn-outline-primary w-100 my-2" htmlFor="realtime">Realtime</label>
                                </div>
                                <div className="col-lg-3">
                                    <label htmlFor="interval">Interval</label>
                                    <select name="interval" id="interval" className="form-control">
                                        <option value="1">1 minuto</option>
                                        <option value="5">5 minutos</option>
                                        <option value="15">15 minutos</option>
                                    </select>
                                </div>
                            </div>
                            
                            <hr />

                            <div className="row">
                                <div className="col-lg-3 my-auto">
                                    <input className="btn-check" type="radio" name="graph-selection" id="historical"/>
                                    <label className="btn btn-outline-primary w-100 my-2" htmlFor="historical">Historical</label>
                                </div>
                                <div className="col-lg-3">
                                    <label htmlFor="start">Start date:</label>
                                    <input type="datetime-local" name="start" id="start" className="form-control" max={maxDate} />
                                </div>
                                <div className="col-lg-3">
                                    <label htmlFor="end">End date:</label>
                                    <input type="datetime-local" name="end" id="end" className="form-control" max={maxDate} />
                                </div>
                            </div>

                            <hr />

                            <div className="row">
                                <div className="col-lg-6">
                                    <button className="btn btn-primary" type="submit">Graph</button>
                                </div>
                            </div>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}