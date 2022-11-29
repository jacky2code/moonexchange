/**
 * @Author: GKing
 * @Date: 2022-11-29 19:54:15
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-29 20:20:04
 * @Description: 
 * @TODO: 
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadBalance } from '../redux/interaction'
import { 
    web3Selector,
    exchangeSelector,
    tokenSelector,
    accountSelector
} from '../redux/selectors'


class Balance extends Component {
    componentDidMount() {
        this.loaadBlockchainData(this.props);
    }
    async loaadBlockchainData(props) {
        const { dispatch, web3, exchange, token, account } = props
        await loadBalance(dispatch, web3, exchange, token, account)
    }

    render() {
        return (
            <div className="card bg-dark text-white">
                <div className="card-header">Balance</div>
                <div className="card-body Balance">

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        web3: web3Selector(state),
        token: tokenSelector(state),
        exchange: exchangeSelector(state),
        account: accountSelector(state)
    }
}

export default connect(mapStateToProps)(Balance);

