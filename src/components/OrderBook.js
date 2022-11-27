/**
 * @Author: GKing
 * @Date: 2022-11-27 10:13:19
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-27 19:39:34
 * @Description: 
 * @TODO: 
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { orderBookLoadedSelector, orderBookSelector } from '../redux/selectors'
import Spinner from './Spinner'

const renderOrder = (order) => {
    return (
        <tr key={order.id}>
            <td>{order.tokenAmount}</td>
            <td className={`text-${order.orderTypeClass}`}>{order.tokenPrice}</td>
            <td>{order.etherAmount}</td>
        </tr>
    )
}

const showOrderBook = (props) => {
    const { orderBook } = props
    return (
        <tbody>
            <tr>
                <th>KSMN</th>
                <th>KSMN/ETH</th>
                <th>ETH</th>
            </tr>
            <tr className='text-danger'>Sell</tr>
            {orderBook.sellOrders.map((order) => renderOrder(order))}
            <tr className='text-success'>Buy</tr>
            {orderBook.buyOrders.map((order) => renderOrder(order))}
        </tbody>
    )
}

class OrderBook extends Component {
    render() {
        return (
            <div className="vertical">
                <div className="card bg-dark text-white">
                    <div className="card-header">Order Book</div>
                    <div className="card-body order-book">
                        <table className="table table-dark table-sm small">
                            {this.props.orderBookLoaded ? showOrderBook(this.props) : <Spinner type="table" />}
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        orderBookLoaded: orderBookLoadedSelector(state),
        orderBook: orderBookSelector(state)
    }
}

export default connect(mapStateToProps)(OrderBook);

