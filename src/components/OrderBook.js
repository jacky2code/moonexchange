/**
 * @Author: GKing
 * @Date: 2022-11-27 10:13:19
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-30 19:18:31
 * @Description: 
 * @TODO: 
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
    orderBookLoadedSelector,
    orderBookSelector,
    exchangeSelector,
    accountSelector,
    orderFillingSelector
 } from '../redux/selectors'
import Spinner from './Spinner'

// 使订单消失
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
            <tr className='text-danger'>
                <th>Sell</th>
                <th></th>
                <th></th>
            </tr>
            {orderBook.sellOrders.map((order) => renderOrder(order))}
            <tr className='text-success'>
                <th>Buy</th>
                <th></th>
                <th></th>
            </tr>
            {orderBook.buyOrders.map((order) => renderOrder(order))}
        </tbody>
    )
}

class OrderBook extends Component {
    render() {
        return (
            <div className="card bg-dark text-white">
                <div className="card-header">Order Book</div>
                <div className="card-body order-book">
                    <table className="table table-dark table-sm small">
                        {this.props.orderBookLoaded ? showOrderBook(this.props) : <Spinner type="table" />}
                    </table>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const orderBookLoaded = orderBookLoadedSelector(state)
    const orderFilling = orderFillingSelector(state)
    return {
        orderBookLoaded: orderBookLoaded && !orderFilling,
        orderBook: orderBookSelector(state),
        account: accountSelector(state),
        exchange: exchangeSelector(state)
    }
}

export default connect(mapStateToProps)(OrderBook);

