/**
 * @Author: GKing
 * @Date: 2022-11-28 13:06:14
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-28 15:40:14
 * @Description: 
 * @TODO: 
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Chart from 'react-apexcharts'
import Spinner from './Spinner'
import { chartOptions, dummyData } from './PriceChart.config'
import { priceChartSelector, priceChartLoadedSelector } from '../redux/selectors'

const priceSymbol = (lastPriceChange) => {
    let output
    if (lastPriceChange === '+') {
        output = <span className='text-success'>&#9650;</span>
    } else {
        output = <span className='text-danger'>&#9660;</span>
    }
    return output
}

const showPriceChart = (priceChart) => {
    return (
        <div className='price-chart'>
            <div className='current-price'>
                <h4>KSMN/ETH &nbsp; {priceSymbol(priceChart.lastPriceChange)} &nbsp; {priceChart.lastPrice}</h4>
            </div>
            <Chart options={chartOptions} series={priceChart.series} type='candlestick' width='100%' height='100%' />
        </div>
    )
}

class PriceChart extends Component {
    render() {
        return (
            <div className="card bg-dark text-white">
                <div className="card-header">Price Chart</div>
                <div className="card-body price-chart">
                    {this.props.priceChartLoaded ? showPriceChart(this.props.priceChart) : <Spinner/>}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {

    console.log({
        priceChartLoaded: priceChartLoadedSelector(state),
        priceChart: priceChartSelector(state)
    })
    return {
        priceChartLoaded: priceChartLoadedSelector(state),
        priceChart: priceChartSelector(state)
    }
}

export default connect(mapStateToProps)(PriceChart);