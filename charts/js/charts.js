fetch('https://coasters-api.herokuapp.com/country/Spain')
    .then(response => response.json())
    .then(coasters => printCoastersCharts(coasters))


function printCoastersCharts(coasters) {

    console.log(coasters)

    const selectedCoasters = coasters.slice(0, 5)

    printSpeedChart(selectedCoasters)
    printLengthChart(selectedCoasters)
    printHeightChart(selectedCoasters)
    printInversionsChart(selectedCoasters)
    printMixedChart(selectedCoasters)
}


function printSpeedChart(selectedCoasters) {

    const data = {
        labels: selectedCoasters.map(elm => elm.name),
        datasets: [{
            data: selectedCoasters.map(elm => elm.speed),
            label: 'km/h',
            borderWidth: 2,
            borderColor: colors.solids,
            backgroundColor: colors.alphas
        }]
    }

    let options = {
        plugins: {
            legend: {
                display: false
            }
        }
    }

    new Chart('chart1', { type: 'bar', data, options })
}




function printLengthChart(selectedCoasters) {

    const data = {
        labels: selectedCoasters.map(elm => elm.name),
        datasets: [{
            data: selectedCoasters.map(elm => elm.length),
            label: 'metros',
            borderWidth: 2,
            borderColor: colors.solids,
            backgroundColor: colors.alphas
        }]
    }


    const options = {
        plugins: {
            legend: {
                position: 'left'
            }
        }
    }


    new Chart('chart2', { type: 'doughnut', data, options })
}


function printHeightChart(selectedCoasters) {

    const data = {
        labels: selectedCoasters.map(elm => elm.name),
        datasets: [{
            data: selectedCoasters.map(elm => elm.height),
            label: 'metros',
            borderWidth: 2,
            backgroundColor: 'rgba(116, 72, 194, 0.4)'
        }]
    }

    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            r: {
                ticks: { display: false }
            }
        }
    }

    new Chart('chart3', { type: 'radar', data, options })
}




function printInversionsChart(selectedCoasters) {

    const data = {
        labels: selectedCoasters.map(elm => elm.name),
        datasets: [{
            data: selectedCoasters.map(elm => elm.height),
            label: 'metros',
            borderColor: colors.solids,
            backgroundColor: colors.alphas
        }]
    }

    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            r: {
                ticks: { display: false }
            }
        }
    }

    new Chart('chart4', { type: 'polarArea', data, options })
}




function printMixedChart(selectedCoasters) {

    const data = {
        labels: selectedCoasters.map(elm => elm.name),
        datasets: [
            {
                data: selectedCoasters.map(elm => elm.height),
                label: 'metros',
                borderWidth: 5,
                borderColor: 'rgba(33, 192, 215, 1)',
            },
            {
                data: selectedCoasters.map(elm => elm.speed),
                label: 'km/h',
                borderWidth: 2,
                borderColor: 'rgba(217, 158, 43, 1)',
                backgroundColor: 'rgba(217, 158, 43, .4)',
                type: 'bar',
                barPercentage: .5
            },
        ]
    }


    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        elements: {
            line: {
                tension: 0.4
            }
        }
    }


    new Chart('chart5', { type: 'line', data, options })
}