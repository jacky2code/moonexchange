/**
 * @Author: GKing
 * @Date: 2022-11-25 09:53:21
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-27 15:53:54
 * @Description: 
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
    canceledOrdersLoaded,
    filledOrdersLoaded,
    allOrdersLoaded
} from './actions';

export const loadWeb3 = (dispatch) => {
    const connection = new Web3(Web3.givenProvider || 'http://localhost:7545')

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
        const token = new web3.eth.Contract(Token.abi, Token.networks[networkId].address);
        dispatch(tokenLoaded(token))

        return token
    } catch (error) {
        console.log('Token contract not deployed to current network. Please select another network with matemask')
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
    // Fetch canceled orders with the 'Cancel' event stream
    const cancelStream = await exchange.getPastEvents('Cancel', {fromBlock: 0, toBlock: 'latest'})
    // Format the canceled orders
    const canceledOrders = cancelStream.map((event) => event.returnValues)
    // Add canceled orders to redux store
    dispatch(canceledOrdersLoaded(canceledOrders))

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