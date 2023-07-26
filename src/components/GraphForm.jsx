import { useState, useEffect } from "react";
import { getGraph } from "../services/getGraph.js";
import { createGraph } from "../services/createGraph.js";

export function GraphForm ({symbol, setGraphOptions, setGraphError}) {
    const [maxDate, setMaxDate] = useState('')

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
        <form onSubmit={handleSubmitGraph}>
                        

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
                            
                            
                        
                    </form>
    )
}