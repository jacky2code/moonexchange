/**
 * @Author: GKing
 * @Date: 2022-11-25 21:28:16
 * @LastEditors: GKing
 * @LastEditTime: 2022-12-01 09:10:17
 * @Description: 
 * @TODO: 
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadAllOrders, subscribeToEvents } from '../redux/interaction';
import { exchangeSelector } from '../redux/selectors';
import Trades from './Trades';
import OrderBook from './OrderBook';
import MyTransactions from './MyTransactions';
import PriceChart from './PriceChart';
import Balance from './Balance';
import CreateNewOrder from './CreateNewOrder';

class Content extends Component {

    componentDidMount() {
        this.loaadBlockchainData(this.props);
    }
    async loaadBlockchainData(props) {
        const {dispatch, exchange} = props
        await loadAllOrders(exchange, dispatch)
        await subscribeToEvents(exchange, dispatch)
    }


    render() {
        return (
            <div className="content">

                <div className="vertical-split">
                    <Balance />
                    <CreateNewOrder />
                </div>
                <OrderBook />

                <div className="vertical-split">
                    <PriceChart />
                    <MyTransactions />
                </div>
                <Trades />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        exchange: exchangeSelector(state)
    }
}

export default connect(mapStateToProps)(Content);






