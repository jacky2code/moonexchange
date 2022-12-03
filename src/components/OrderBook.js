/**
 * @Author: GKing
 * @Date: 2022-11-27 10:13:19
 * @LastEditors: GKing
 * @LastEditTime: 2022-12-03 13:20:01
 * @Description: 
 * @TODO: 
 */

import React, { Component } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { connect } from 'react-redux'
import { fillOrder } from '../redux/interaction'
import {
    orderBookLoadedSelector,
    orderBookSelector,
    exchangeSelector,
    accountSelector,
    orderFillingSelector
} from '../redux/selectors'
import Spinner from './Spinner'

// 使订单消失
const renderOrder = (order, dispatch, exchange, account) => {
    console.log('order ====== ', order)
    const isOwnOrder = (order.userAdr === account)
    return (
        <OverlayTrigger
            key={order.id}
            placement='left'
            overlay={
                <Tooltip id={order.id}>
                    {isOwnOrder ? 'own order!' : `Click here to ${order.orderFillClass}`}
                </Tooltip>
            }
        >
            <tr key={order.id}
                className="table-hover pointer"
                onClick={() => {
                    if(!isOwnOrder){fillOrder(dispatch, exchange, order, account)}
                }}
            >
                <td>{order.tokenAmount}</td>
                <td className={`text-${order.orderTypeClass}`}>{order.tokenPrice}</td>
                <td>{order.etherAmount}</td>
            </tr>
        </OverlayTrigger>

    )
}

const showOrderBook = (props) => {
    const { dispatch, orderBook, exchange, account } = props
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
            {orderBook.sellOrders.map((order) => renderOrder(order, dispatch, exchange, account))}
            <tr className='text-success'>
                <th>Buy</th>
                <th></th>
                <th></th>
            </tr>
            {orderBook.buyOrders.map((order) => renderOrder(order, dispatch, exchange, account))}
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
    console.log('orderFilling ====== ', orderFilling)
    console.log('orderBookLoaded ====== ', orderBookLoaded)
    return {
        orderBookLoaded: orderBookLoaded && !orderFilling,
        orderBook: orderBookSelector(state),
        account: accountSelector(state),
        exchange: exchangeSelector(state)
    }
}

export default connect(mapStateToProps)(OrderBook);

