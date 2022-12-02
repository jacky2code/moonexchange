/**
 * @Author: GKing
 * @Date: 2022-11-29 19:54:15
 * @LastEditors: GKing
 * @LastEditTime: 2022-12-01 22:41:14
 * @Description: 
 * @TODO: 
 */

import React, { Component } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { connect } from 'react-redux'
import {
    loadBalance,
    depositEth,
    withdrawEth,
    depositToken,
    withdrawToken
} from '../redux/interaction'
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
    ethAmountDepositedSelector,
    ethAmountWithdrawedSelector,
    tokenAmountDepositedSelector,
    tokenAmountWithdrawedSelector
} from '../redux/selectors'

// 获取输入框改变的数值
import {
    ethDepositedAmountChanged,
    ethWithdrawedAmountChanged,
    tokenDepositedAmountChanged,
    tokenWithdrawedAmountChanged
} from '../redux/actions'



const showBalanceForm = (props) => {
    const {
        dispatch,
        ethBalance,
        ethBalanceInExch,
        tokenBalance,
        tokenBalanceInExch,
        ethAmountDeposited,
        ethAmountWithdrawed,
        tokenAmountDeposited,
        tokenAmountWithdrawed,
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
                <form className="row" onSubmit={(event) => {
                    event.preventDefault()
                    depositEth(dispatch, exchange, web3, account, ethAmountDeposited)
                    console.log("form submitting...")
                }}>
                    <div className="col-12 col-sm pr-sm-2">
                        <input type="text" placeholder="ETH Amount"
                            onChange={(e) => dispatch(ethDepositedAmountChanged(e.target.value))}
                            className="form-control form-control-sm bg-dark text-white"
                            required />
                    </div>
                    <div className="col-12 col-sm-auto pl-sm-0">
                        <button type="submit" className="btn btn-primary btn-block btn-sm">Deposit</button>
                    </div>
                </form>

                <table className='table table-dark table-sm small'>
                    <tbody>
                        <tr>
                            <td>KSMN</td>
                            <td>{tokenBalance}</td>
                            <td>{tokenBalanceInExch}</td>
                        </tr>
                    </tbody>
                </table>
                <form className="row" onSubmit={(event) => {
                    event.preventDefault()
                    depositToken(dispatch, exchange, web3, token, account, tokenAmountDeposited)
                    console.log("form submitting...")
                }}>
                    <div className="col-12 col-sm pr-sm-2">
                        <input type="text" placeholder="KSMN Amount"
                            onChange={(e) => dispatch(tokenDepositedAmountChanged(e.target.value))}
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

                <form className="row" onSubmit={(event) => {
                    event.preventDefault()
                    withdrawEth(dispatch, exchange, web3, account, ethAmountWithdrawed)
                    console.log("form submitting...")
                }}>
                    <div className="col-12 col-sm pr-sm-2">
                        <input type="text" placeholder="ETH Amount"
                            onChange={(e) => dispatch(ethWithdrawedAmountChanged(e.target.value))}
                            className="form-control form-control-sm bg-dark text-white"
                            required />
                    </div>
                    <div className="col-12 col-sm-auto pl-sm-0">
                        <button type="submit" className="btn btn-primary btn-block btn-sm">Withdraw</button>
                    </div>
                </form>

                <table className='table table-dark table-sm small'>
                    <tbody>
                        <tr>
                            <td>KSMN</td>
                            <td>{tokenBalance}</td>
                            <td>{tokenBalanceInExch}</td>
                        </tr>
                    </tbody>
                </table>
                <form className="row" onSubmit={(event) => {
                    event.preventDefault()
                    withdrawToken(dispatch, exchange, web3, token, account, tokenAmountWithdrawed)
                    console.log("form submitting...")
                }}>
                    <div className="col-12 col-sm pr-sm-2">
                        <input type="text" placeholder="KSMN Amount"
                            onChange={(e) => dispatch(tokenWithdrawedAmountChanged(e.target.value))}
                            className="form-control form-control-sm bg-dark text-white"
                            required />
                    </div>
                    <div className="col-12 col-sm-auto pl-sm-0">
                        <button type="submit" className="btn btn-primary btn-block btn-sm">Withdraw</button>
                    </div>
                </form>
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
        ethAmountDeposited: ethAmountDepositedSelector(state),
        ethAmountWithdrawed: ethAmountWithdrawedSelector(state),
        tokenAmountDeposited: tokenAmountDepositedSelector(state),
        tokenAmountWithdrawed: tokenAmountWithdrawedSelector(state)
        
    }
}

export default connect(mapStateToProps)(Balance);

