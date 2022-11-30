/**
 * @Author: GKing
 * @Date: 2022-11-29 19:54:15
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-30 11:54:27
 * @Description: 
 * @TODO: 
 */

import React, { Component } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { connect } from 'react-redux'
import { loadBalance, depositEth } from '../redux/interaction'
import Spinner from './Spinner'
import {
    web3Selector,
    exchangeSelector,
    tokenSelector,
    accountSelector,
    ethBalanceSelector,
    ethBalanceInExchSelector,
    tokenBalanceSelector,
    tokenBalanceInExchSelector,
    balancesLoadingSelector,
    ethAmountDepositedSelector
} from '../redux/selectors'
import { ethDepositedAmountChanged } from '../redux/actions'



const showBalanceForm = (props) => {
    const {
        dispatch,
        ethBalance,
        ethBalanceInExch,
        tokenBalance,
        tokenBalanceInExch,
        ethAmountDeposited,
        web3,
        token,
        exchange,
        account
    } = props

    return (
        <Tabs defaultActiveKey='deposit' className='bg-dark text-black'>
            <Tab eventKey='deposit' title='Deposit' className='bg-dark'>
                <table className='table table-dark table-sm small'>
                    <thead>
                        <tr>
                            <th>Token</th>
                            <th>Wallet</th>
                            <th>Exchange</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ETH</td>
                            <td>{ethBalance}</td>
                            <td>{ethBalanceInExch}</td>
                        </tr>

                    </tbody>
                </table>

                <table className='table table-dark table-sm small'>
                    <tbody>
                        <tr>
                            <td>KSMN</td>
                            <td>{tokenBalance}</td>
                            <td>{tokenBalanceInExch}</td>
                        </tr>
                    </tbody>
                </table>

                <form 
                    className="row" 
                    onSubmit={(event) => {
                        event.preventDefault()
                        depositEth(dispatch,exchange,web3,account,ethAmountDeposited)
                        console.log("form submitting...")
                    }}
                >
                    <div className="col-12 col-sm pr-sm-2">
                        <input
                            type="text"
                            placeholder="ETH Amount"
                            onChange={(e) => dispatch(ethDepositedAmountChanged(e.target.value))}
                            className="form-control form-control-sm bg-dark text-white" 
                            required />
                    </div>
                    <div className="col-12 col-sm-auto pl-sm-0">
                        <button type="submit" className="btn btn-primary btn-block btn-sm">Deposit</button>
                    </div>
                </form>
            </Tab >
    <Tab eventKey='withdraw' title='Withdraw' className='bg-dark'>
        <table className='table table-dark table-sm small'>
            <thead>
                <tr>
                    <th>Token</th>
                    <th>Wallet</th>
                    <th>Exchange</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>ETH</td>
                    <td>{ethBalance}</td>
                    <td>{ethBalanceInExch}</td>
                </tr>

            </tbody>
        </table>

        <table className='table table-dark table-sm small'>
            <tbody>
                <tr>
                    <td>KSMN</td>
                    <td>{tokenBalance}</td>
                    <td>{tokenBalanceInExch}</td>
                </tr>
            </tbody>
        </table>
    </Tab>
        </Tabs >
    )
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
                    {this.props.showBalanceForm ? showBalanceForm(this.props) : <Spinner />}
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
        tokenBalance: tokenBalanceSelector(state),
        tokenBalanceInExch: tokenBalanceInExchSelector(state),
        balancesLoading: balancesLoadingSelector(state),
        showBalanceForm: !(balancesLoadingSelector(state)),
        ethAmountDeposited: ethAmountDepositedSelector(state)

    }
}

export default connect(mapStateToProps)(Balance);

