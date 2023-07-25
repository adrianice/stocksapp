export function createGraph(data, symbol) {
    const options = {
        accessibility: {
            enabled: false
        },
        chart: {
            type: 'line'
        },
        title: {
            text: symbol
        },
        subtitle: {
            text: data[0].datetime + ' - ' + data[data.length - 1].datetime
        },
        xAxis: {
            type: 'datetime',
            categories: data.map(item => new Date(item.datetime)).reverse(),
            labels: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Stock price'
            }
        },
        series: [{
            name: symbol,
            data: data.map(item => parseFloat(item.close)).reverse(),
            color: '#78c2ad'
        }]
    }

    return options
}