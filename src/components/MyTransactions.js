/**
 * @Author: GKing
 * @Date: 2022-11-27 10:13:19
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-28 01:01:44
 * @Description: 
 * @TODO: 
 */

import React, { Component } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { connect } from 'react-redux'
import { myFilledOrdersLoadedSelector, myFilledOrdersSelector, myOpenOrdersLoadedSelector, myOpenOrdersSelector } from '../redux/selectors'
import Spinner from './Spinner'


const showMyFilledOrders = (myFilledOrders) => {
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

const showMyOpenOrders = (myOpenOrders) => {
    return (
        <tbody>
            {myOpenOrders.map((order) => {
                return (
                    <tr className={`order-${order.id}`} key={order.id.toString()}>
                        <td className={`text-${order.orderTypeClass}`}>{order.tokenAmount}</td>
                        <td className={`text-${order.tokenPriceClass}`}>{order.tokenPrice}</td>
                        <td className='text-muted'>x</td>
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
                            {this.props.myFilledOrdersLoaded ? showMyFilledOrders(this.props.myFilledOrders) : <Spinner type="table" />}
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
                            {this.props.myOpenOrdersLoaded ? showMyOpenOrders(this.props.myOpenOrders) : <Spinner type="table" />}
                        </table>
                            </Tab>
                        </Tabs>
                        
                    </div>
                </div>
        )
    }
}

function mapStateToProps(state) {
    console.log({
        myFilledOrdersLoaded: myFilledOrdersLoadedSelector(state),
        myFilledOrders: myFilledOrdersSelector(state),
        myOpenOrdersLoaded: myOpenOrdersLoadedSelector(state),
        myOpenOrders: myOpenOrdersSelector(state)
    })
    return {
        myFilledOrdersLoaded: myFilledOrdersLoadedSelector(state),
        myFilledOrders: myFilledOrdersSelector(state),
        myOpenOrdersLoaded: myOpenOrdersLoadedSelector(state),
        myOpenOrders: myOpenOrdersSelector(state)
    }
}

export default connect(mapStateToProps)(MyTransactions);

