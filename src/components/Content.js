/**
 * @Author: GKing
 * @Date: 2022-11-25 21:28:16
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-28 01:19:32
 * @Description: 
 * @TODO: 
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadAllOrders } from '../redux/interaction';
import { exchangeSelector } from '../redux/selectors';
import Trades from './Trades';
import OrderBook from './OrderBook';
import MyTransactions from './MyTransactions';

class Content extends Component {

    UNSAFE_componentWillMount() {
        this.loaadBlockchainData(this.props.dispatch);
    }
    async loaadBlockchainData(dispatch) {
        await loadAllOrders(this.props.exchange, dispatch)
    }


    render() {
        return (
            <div className="content">

                <div className="vertical-split">
                    <div className="card bg-dark text-white">
                        <div className="card-header">Card Title</div>
                        <div className="card-body">
                            <p className="card-text">Some quick example text</p>
                            <a href="localhost:3000" className="card-link">Card link</a>
                        </div>
                    </div>
                    <div className="card bg-dark text-white">
                        <div className="card-header">Card Title</div>
                        <div className="card-body">
                            <p className="card-text">Some quick example text</p>
                            <a href="localhost:3000" className="card-link">Card link</a>
                        </div>
                    </div>
                </div>
                <OrderBook />

                <div className="vertical-split">
                    <div className="card bg-dark text-white">
                        <div className="card-header">Card Title</div>
                        <div className="card-body">
                            <p className="card-text">Some quick example text</p>
                            <a href="localhost:3000" className="card-link">Card link</a>
                        </div>
                    </div>
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






