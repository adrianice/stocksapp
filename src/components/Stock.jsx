import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStockBySymbol } from "../services/getStockBySymbol.js";
import { Header } from "./Header.jsx";
import { useNavigate } from "react-router-dom";
import HighCharts from 'highcharts';
import HighChartsReact from 'highcharts-react-official';
import { GraphForm } from "./GraphForm.jsx";

export function Stock () {
    const navigate = useNavigate()
    const params = useParams()
    const symbol = params.symbol.replace(/\_/g, ".")
    
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

    return (
        <div className="container-fluid">
            <Header log={true}/>
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
                    <div className="card card-body">
                        <GraphForm symbol={symbol} setGraphOptions={setGraphOptions} setGraphError={setGraphError}/>
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
                </div>
            </div>
        </div>
    )
}