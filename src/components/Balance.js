/**
 * @Author: GKing
 * @Date: 2022-11-29 19:54:15
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-29 22:40:01
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
    accountSelector,
    ethBalanceSelector,
    ethBalanceInExchSelector,
    tokenBalanceSelector,
    tokenBalanceInExchSelector,
    balancesLoadingSelector
} from '../redux/selectors'
import Spinner from './Spinner'


const showBalanceForm = (props) => {

}

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
                    {this.props.showBalanceForm ? showBalanceForm(this.props) : <Spinner/>}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('balance_state_log ====== ', {
        web3: web3Selector(state),
        token: tokenSelector(state),
        exchange: exchangeSelector(state),
        account: accountSelector(state),
        ethBalance: ethBalanceSelector(state),
        ethBalanceInExch: ethBalanceInExchSelector(state),
        tokenBalance: tokenBalanceSelector(state),
        tokenBalanceInExch: tokenBalanceInExchSelector(state),
        balancesLoading: balancesLoadingSelector(state)
    })

    return {
        web3: web3Selector(state),
        token: tokenSelector(state),
        exchange: exchangeSelector(state),
        account: accountSelector(state),
        ethBalance: ethBalanceSelector(state),
        ethBalanceInExch: ethBalanceInExchSelector(state),
        tokenBalance: ethBalanceSelector(state),
        tokenBalanceInExch: tokenBalanceInExchSelector(state),
        balancesLoading: balancesLoadingSelector(state),
        showBalanceForm: !(balancesLoadingSelector(state))
        
    }
}

export default connect(mapStateToProps)(Balance);

