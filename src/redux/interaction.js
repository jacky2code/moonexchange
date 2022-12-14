/**
 * @Author: GKing
 * @Date: 2022-11-25 09:53:21
 * @LastEditors: GKing
 * @LastEditTime: 2022-12-03 13:25:27
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
    orderFilled,
    orderFilling,
    orderCreated,
    buyOrderCreating,
    sellOrderCreating,
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
    const cancelStream = await exchange.getPastEvents('Cancel', { fromBlock: 0, toBlock: 'latest' })
    // Format the cancelled orders
    const cancelledOrders = cancelStream.map((event) => event.returnValues)
    // Add cancelled orders to redux store
    dispatch(cancelledOrdersLoaded(cancelledOrders))

    // Fetch filled orders with the 'Trade' event stream
    const tradeStream = await exchange.getPastEvents('Trade', { fromBlock: 0, toBlock: 'latest' })
    // Format the filled orders
    const filledOrders = tradeStream.map((event) => event.returnValues)
    // Add filled orders to redux store
    dispatch(filledOrdersLoaded(filledOrders))

    // Fetch all orders with the 'Order' event stream
    const allOrdersStream = await exchange.getPastEvents('Order', { fromBlock: 0, toBlock: 'latest' })
    // Format all orders
    const alldOrders = allOrdersStream.map((event) => event.returnValues)
    // Add all orders to redux store
    dispatch(allOrdersLoaded(alldOrders))
}

// 完成订单
export const fillOrder = async (dispatch, exchange, order, account) => {
    exchange.methods
        .fillOrder(order.id)
        .send({ from: account })
        .on('transactionHash', (hash) => {
            dispatch(orderFilling())
        }).on('error', (error, receipt) => { // 如果交易被网络拒绝并带有交易收据，则第二个参数将是交易收据。
            console.log(error)
            window.alert('There was an error!')
        });
}

// 取消订单
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
    // filled order
    exchange.events.Trade({}, (error, event) => {
        console.log('interaction ====== comming')
        dispatch(orderFilled(event.returnValues))
        console.log('interaction ====== error',error)
    })

    exchange.events.Order({}, (error, event) => {
        dispatch(orderCreated(event.returnValues))
    })

    exchange.events.Deposit({}, (error, event) => {
        dispatch(allBalancesLoaded())
    })

    exchange.events.Withdraw({}, (error, event) => {
        dispatch(allBalancesLoaded())
    })
}

// 获取余额
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

// 存入 ETH
export const depositEth = async (dispatch, exchange, web3, account, amount) => {
    exchange.methods.depositEther().send(
        { from: account, value: web3.utils.toWei(amount, 'ether') }
    ).on('transactionHash', (hash) => {
        dispatch(balancesLoading())
    }).on('error', (error, receipt) => { // 如果交易被网络拒绝并带有交易收据，则第二个参数将是交易收据。
        console.log(error)
        window.alert('There was an error!')
    });
}

// 取出 ETH
export const withdrawEth = async (dispatch, exchange, web3, account, amount) => {
    exchange.methods.withdrawEthers(web3.utils.toWei(amount, 'ether')).send(
        { from: account }
    ).on('transactionHash', (hash) => {
        dispatch(balancesLoading())
    }).on('error', (error, receipt) => { // 如果交易被网络拒绝并带有交易收据，则第二个参数将是交易收据。
        console.log(error)
        window.alert('There was an error!')
    });
}

// 存入 Token
export const depositToken = async (dispatch, exchange, web3, token, account, amount) => {
    amount = web3.utils.toWei(amount, 'ether')
    token.methods.approve(
        exchange.options.address, amount).send({ from: account }
        ).on('transactionHash', (hash) => {
            exchange.methods.depositToken(token.options.address, amount).send(
                { from: account }
            ).on('transactionHash', (hash) => {
                dispatch(balancesLoading())
            }).on('error', (error, receipt) => { // 如果交易被网络拒绝并带有交易收据，则第二个参数将是交易收据。
                console.log(error)
                window.alert('There was an error!')
            })
        })
}

// 取出 Token
export const withdrawToken = async (dispatch, exchange, web3, token, account, amount) => {
    amount = web3.utils.toWei(amount, 'ether')
    exchange.methods.withdrawTokens(token.options.address, amount).send(
        { from: account }
    ).on('transactionHash', (hash) => {
        dispatch(balancesLoading())
    }).on('error', (error, receipt) => { // 如果交易被网络拒绝并带有交易收据，则第二个参数将是交易收据。
        console.log(error)
        window.alert('There was an error!')
    })

}

// 创建买入订单
export const createBuyOrder = (dispatch, exchange, token, web3, order, account) => {
    const tokenGetAdr = token.options.address
    const amountGet = web3.utils.toWei(order.amount, 'ether')
    const tokenGiveAdr = ETHER_ADDRESS
    const amountGive = web3.utils.toWei((order.amount * order.price).toString(), 'ether')
    exchange.methods.createOrder(tokenGetAdr, amountGet, tokenGiveAdr, amountGive).send({
        from: account
    }).on('transactionHash', (hash) => {
        dispatch(buyOrderCreating())
    }).on('error', (error, receipt) => { // 如果交易被网络拒绝并带有交易收据，则第二个参数将是交易收据。
        console.log(error)
        window.alert('There was an error!')
    });
}

// 创建卖出订单
export const createSellOrder = (dispatch, exchange, token, web3, order, account) => {
    const tokenGetAdr = ETHER_ADDRESS
    const amountGet = web3.utils.toWei((order.amount * order.price).toString(), 'ether')
    const tokenGiveAdr = token.options.address
    const amountGive = web3.utils.toWei(order.amount, 'ether')
    exchange.methods.createOrder(tokenGetAdr, amountGet, tokenGiveAdr, amountGive).send({
        from: account
    }).on('transactionHash', (hash) => {
        dispatch(sellOrderCreating())
    }).on('error', (error, receipt) => { // 如果交易被网络拒绝并带有交易收据，则第二个参数将是交易收据。
        console.log(error)
        window.alert('There was an error!')
    });
}