/**
 * @Author: GKing
 * @Date: 2022-11-25 09:53:21
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-30 12:10:18
 * @Description: 交互
 * @TODO: 
 */
import Web3 from 'web3';
import Token from '../abis/Token.json'
import Exchange from '../abis/Exchange.json'

import {
    web3Loaded,
    web3AccountLoaded,
    tokenLoaded,
    exchangeLoaded,
    cancelledOrdersLoaded,
    filledOrdersLoaded,
    allOrdersLoaded,
    orderCancelling,
    orderCancelled,
    ethBalanceLoaded,
    tokenBalanceLoaded,
    ethBalanceInExchLoaded,
    tokenBalanceInExchLoaded,
    allBalancesLoaded,
    balancesLoading
} from './actions';
import { ETHER_ADDRESS } from '../Helper';

export const loadWeb3 = (dispatch) => {
    const connection = new Web3(Web3.givenProvider || 'http://localhost:8545')

    dispatch(web3Loaded(connection))

    return connection
}

export const loadAccount = async (web3, dispatch) => {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0]
    dispatch(web3AccountLoaded(account))

    return account
}

export const loadToken = async (web3, networkId, dispatch) => {

    try {
        const networks = Token.networks
        const netWorkData = networks[networkId]
        const netWordAddress = netWorkData.address
        const token = new web3.eth.Contract(Token.abi, netWordAddress);
        dispatch(tokenLoaded(token))

        return token
    } catch (error) {
        console.log('Token contract not deployed to current network. Please select another network with matemask network id :', networkId)
        return null
    }
}

export const loadExchange = async (web3, networkId, dispatch) => {

    try {
        const exchange = new web3.eth.Contract(Exchange.abi, Exchange.networks[networkId].address);
        dispatch(exchangeLoaded(exchange))

        return exchange
    } catch (error) {
        console.log('Exchange contract not deployed to current network. Please select another network with matemask')
        return null
    }
}

export const loadAllOrders = async (exchange, dispatch) => {
    // Fetch cancelled orders with the 'Cancel' event stream
    const cancelStream = await exchange.getPastEvents('Cancel', {fromBlock: 0, toBlock: 'latest'})
    // Format the cancelled orders
    const cancelledOrders = cancelStream.map((event) => event.returnValues)
    // Add cancelled orders to redux store
    dispatch(cancelledOrdersLoaded(cancelledOrders))

    // Fetch filled orders with the 'Trade' event stream
    const tradeStream = await exchange.getPastEvents('Trade', {fromBlock: 0, toBlock: 'latest'})
    // Format the filled orders
    const filledOrders = tradeStream.map((event) => event.returnValues)
    // Add filled orders to redux store
    dispatch(filledOrdersLoaded(filledOrders))

    // Fetch all orders with the 'Order' event stream
    const allOrdersStream = await exchange.getPastEvents('Order', {fromBlock: 0, toBlock: 'latest'})
    // Format all orders
    const alldOrders = allOrdersStream.map((event) => event.returnValues)
    // Add all orders to redux store
    dispatch(allOrdersLoaded(alldOrders))
}

export const cancelOrder = (dispatch, exchange, order, account) => {
    exchange.methods.cancelOrder(order.id).send({
        from: account
    }).on('transactionHash', (hash) => {
        dispatch(orderCancelling())
    }).on('error', (error, receipt) => { // 如果交易被网络拒绝并带有交易收据，则第二个参数将是交易收据。
        console.log(error)
        window.alert('There was an error!')
    });
}
// 订阅合约事件 
export const subscribeToEvents = async (exchange, dispatch) => {
    exchange.events.Cancel({}, (error, event) => {
        dispatch(orderCancelled(event.returnValues))
    })
    // TODO: filled order
    // ...

    exchange.events.Deposit({}, (error, event) => {
        dispatch(allBalancesLoaded())
    })

    exchange.events.Withdraw({}, (error, event) => {
        dispatch(allBalancesLoaded())
    })
}

export const loadBalance = async (dispatch, web3, exchange, token, account) => {
    // ETH balance in wallet
    const ethBlance = await web3.eth.getBalance(account)
    dispatch(ethBalanceLoaded(ethBlance))
    
    // Token balance in walet
    const tokenBalance = await token.methods.balanceOf(account).call()
    dispatch(tokenBalanceLoaded(tokenBalance))

    // User's ETH balance in exchange
    const ethBalanceInExch = await exchange.methods.balanceOf(ETHER_ADDRESS, account).call()
    dispatch(ethBalanceInExchLoaded(ethBalanceInExch))

    // User's token balance in exchange
    const tokenBalanceInExch = await exchange.methods.balanceOf(token.options.address, account).call()
    dispatch(tokenBalanceInExchLoaded(tokenBalanceInExch))

    // All balances loaded
    dispatch(allBalancesLoaded())
}

export const depositEth = async (dispatch,exchange,web3,account,amount) => {
    console.log('ammount ====== ',amount)
    console.log('web3.utils.toWei(amount,"ether") ====== ',web3.utils.toWei(amount,'ether'))
    
    exchange.methods.depositEther().send(
            { from: account, value:web3.utils.toWei(amount,'ether') }
        ).on('transactionHash', (hash) => {
            dispatch(balancesLoading())
        }).on('error', (error, receipt) => { // 如果交易被网络拒绝并带有交易收据，则第二个参数将是交易收据。
            console.log(error)
            window.alert('There was an error!')
        });
}

