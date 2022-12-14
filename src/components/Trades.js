/**
 * @Author: GKing
 * @Date: 2022-11-27 10:13:19
 * @LastEditors: GKing
 * @LastEditTime: 2022-12-03 11:12:43
 * @Description: 
 * @TODO: 
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
    filledOrdersLoadedSelector, 
    filledOrdersSelector 
} from '../redux/selectors'
import Spinner from './Spinner'

const showFilledOrders = (filledOrders) => {
    return (
        <tbody>
            {filledOrders.map((order) => {
                return (
                    <tr className={`order-${order.id}`} key={order.id.toString()}>
                        <td className='text-muted'>{order.formatTime}</td>
                        <td>{order.tokenAmount}</td>
                        <td className={`text-${order.tokenPriceClass}`}>{order.tokenPrice}</td>
                    </tr>
                )
            })}
        </tbody>
    )
}

class Trades extends Component {
    render() {
        return (
            <div className="card bg-dark text-white">
                <div className="card-header">Trades</div>
                <div className="card-body trades">
                    <table className="table table-dark table-sm small">
                        <thead>
                            <tr>
                                <th>TIME</th>
                                <th>KSMN</th>
                                <th>KSMN/ETH</th>
                            </tr>
                        </thead>
                        {this.props.filledOrdersLoaded ? showFilledOrders(this.props.filledOrders) : <Spinner type="table" />}
                    </table>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('filledOrders ====== ', {
        filledOrdersLoaded: filledOrdersLoadedSelector(state),
        filledOrders: filledOrdersSelector(state)
    })
    return {
        filledOrdersLoaded: filledOrdersLoadedSelector(state),
        filledOrders: filledOrdersSelector(state)
    }
}

export default connect(mapStateToProps)(Trades);

