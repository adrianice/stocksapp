import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStockBySymbol } from "../services/getStockBySymbol.js";
import { Header } from "./Header.jsx";
import { useNavigate } from "react-router-dom";
import { getGraph } from "../services/getGraph.js";
import HighCharts from 'highcharts';
import HighChartsReact from 'highcharts-react-official';
import { createGraph } from "../services/createGraph.js";

export function Stock () {
    const navigate = useNavigate()
    const params = useParams()
    const symbol = params.symbol.replace(/\_/g, ".")
    
    const [maxDate, setMaxDate] = useState('')
    const [stockInfo, setStockInfo] = useState(null)
    const [graphOptions, setGraphOptions] = useState(null)
    const [graphError, setGraphError] = useState('')

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

    const handleSubmitGraph = (event) => {
        event.preventDefault()
        const data = event.target.elements

        if (!data.start.value) return
        if (!data.end.value) return

        const interval = data.interval.value + 'min'

        getGraph(symbol, interval, data.start.value, data.end.value).then((response) => {
            if (response.values) {
                const options = createGraph(response.values, symbol)
                setGraphOptions(options)
                setGraphError('')
            }
            else {
                setGraphOptions(null)
                setGraphError('No data is available on the specified dates. Try setting different start/end dates.')
            }
                
        })
        
    }

    return (
        <div className="container-fluid">
            <Header />
            <div className="row">
                <div className="col-lg-12">
                    <p className="my-3 mx-2">
                        {
                            stockInfo != null
                            ? `${stockInfo[0].symbol} - ${stockInfo[0].name} - ${stockInfo[0].currency}`
                            : ''
                        }
                    </p>
                    <hr />
                </div>
                <div className="col-lg-6 mx-auto">
                    <form onSubmit={handleSubmitGraph}>
                        <div className="card card-body">

                            <div className="row">
                                
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
                                <div className="col-lg-3">
                                    <label htmlFor="interval">Interval</label>
                                    <select name="interval" id="interval" className="form-control">
                                        <option value="1">1 minute</option>
                                        <option value="5">5 minutes</option>
                                        <option value="15">15 minutes</option>
                                    </select>
                                </div>
                            </div>
                            <hr />

                            <div className="row">
                                <div className="col-lg-6">
                                    <button className="btn btn-primary" type="submit">Graph</button>
                                </div>
                            </div>
                            
                            {
                                graphOptions !== null &&

                                <HighChartsReact 
                                    highcharts={HighCharts}
                                    options={graphOptions}
                                />
                            }
                            {
                                graphError !== '' && <p className="text-secondary my-3">{graphError}</p>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}