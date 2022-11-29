/**
 * @Author: GKing
 * @Date: 2022-11-27 10:13:19
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-29 20:01:54
 * @Description: 
 * @TODO: 
 */

import React, { Component } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { connect } from 'react-redux'
import { 
    myFilledOrdersLoadedSelector, 
    myFilledOrdersSelector, 
    myOpenOrdersLoadedSelector, 
    myOpenOrdersSelector,
    exchangeSelector,
    accountSelector,
    orderCancellingSelector
} from '../redux/selectors'
import Spinner from './Spinner'
import { cancelOrder } from '../redux/interaction'


const showMyFilledOrders = (props) => {
    const { myFilledOrders } = props
    return (
        <tbody>
            {myFilledOrders.map((order) => {
                return (
                    <tr className={`order-${order.id}`} key={order.id.toString()}>
                        <td className='text-muted'>{order.formatTime}</td>
                        <td className={`text-${order.orderTypeClass}`}>{order.orderSign}{order.tokenAmount}</td>
                        <td className={`text-${order.tokenPriceClass}`}>{order.tokenPrice}</td>
                    </tr>
                )
            })}
        </tbody>
    )
}

const showMyOpenOrders = (props) => {
    const { myOpenOrders, dispatch, exchange, account } = props
    return (
        <tbody>
            {myOpenOrders.map((order) => {
                return (
                    <tr className={`order-${order.id}`} key={order.id.toString()}>
                        <td className={`text-${order.orderTypeClass}`}>{order.tokenAmount}</td>
                        <td className={`text-${order.tokenPriceClass}`}>{order.tokenPrice}</td>
                        <td 
                            className='text-muted cancel-order'
                            onClick={(e) => {
                                cancelOrder(dispatch, exchange, order, account)
                            }}
                        >X</td>
                    </tr>
                )
            })}
        </tbody>
    )
}

class MyTransactions extends Component {
    render() {
        return (
                <div className="card bg-dark text-white">
                    <div className="card-header">My Transactions</div>
                    <div className="card-body MyTransactions">
                        <Tabs defaultActiveKey="trades" className="bg-dark text-black">
                            <Tab eventKey="trades" title="Trades" className="bg-dark">
                            <table className="table table-dark table-sm small">
                            <thead>
                                <tr>
                                    <th>TIME</th>
                                    <th>KSMN</th>
                                    <th>KSMN/ETH</th>
                                </tr>
                            </thead>
                            {this.props.myFilledOrdersLoaded ? showMyFilledOrders(this.props) : <Spinner type="table" />}
                        </table>
                            </Tab>
                            <Tab eventKey="orders" title="Orders">
                            <table className="table table-dark table-sm small">
                            <thead>
                                <tr>
                                    <th>AMOUNT</th>
                                    <th>KSMN/ETH</th>
                                    <th>CANCEL</th>
                                </tr>
                            </thead>
                            {this.props.myOpenOrdersLoaded ? showMyOpenOrders(this.props) : <Spinner type="table" />}
                        </table>
                            </Tab>
                        </Tabs>
                        
                    </div>
                </div>
        )
    }
}

function mapStateToProps(state) {
    const myOpenOrdersLoaded = myOpenOrdersLoadedSelector(state)
    const orderCancelling = orderCancellingSelector(state)
    return {
        myFilledOrdersLoaded: myFilledOrdersLoadedSelector(state),
        myFilledOrders: myFilledOrdersSelector(state),
        myOpenOrdersLoaded: myOpenOrdersLoaded && !orderCancelling,
        myOpenOrders: myOpenOrdersSelector(state),
        exchange: exchangeSelector(state),
        account: accountSelector(state),
        // orderCancelling: orderCancellingSelector(state)
    }
}

export default connect(mapStateToProps)(MyTransactions);

