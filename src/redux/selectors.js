/**
 * @Author: GKing
 * @Date: 2022-11-25 20:54:03
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-27 15:21:30
 * @Description: 
 * @TODO: 
 */

import { get } from "lodash";
import { createSelector } from "reselect";
import { ETHER_ADDRESS, tokens, ethers, GREEN, RED } from '../Helper'
import moment from "moment/moment";

const account = state => get(state, 'web3.account')
export const accountSelector = createSelector(account, a => a);

const tokenLoaded = state => get(state, 'token.loaded', false)
export const tokenLoadedSelector = createSelector(tokenLoaded, tl => tl)

const token = state => get(state, 'token.contract', false)
export const tokenSelector = createSelector(token, t => t)

const exchangeLoaded = state => get(state, 'exchange.loaded', false)
export const exchangeLoadedSelector = createSelector(exchangeLoaded, el => el)

const exchange = state => get(state, 'exchange.contract', false)
export const exchangeSelector = createSelector(exchange, e => e)


export const contractsLoadedSelector = createSelector(
    tokenLoaded,
    exchangeLoaded,
    (tl, el) => (tl && el)
)

const filledOrdersLoaded = state => get(state, 'exchange.filledOrders.loaded', false)
export const filledOrdersLoadedSelector = createSelector(
    filledOrdersLoaded, 
    fld => fld
    )

const filledOrders = state => get(state, 'exchange.filledOrders.data', [])
export const filledOrdersSelector = createSelector (
    filledOrders,
    (orders) => {
        // Sort order by time asc
        orders = orders.sort((a,b) => a.timestamp - b.timestamp)
        orders = decorateFilledOrders(orders)
        // Sort order by time desc
        orders = orders.sort((a,b) => b.timestamp - a.timestamp)
        console.log('filledOrders ==============',orders)
        return orders
    }
)

const decorateFilledOrders = (orders) => {
    let preOrder = orders[0]
    return (
        orders.map((order) => {
            order = decorateOrder(order)
            order = decorateFilledOrder(order, preOrder)  
            preOrder = order
            return order
        })
    )
}

const decorateOrder = (order) => {
    let etherAmount
    let tokenAmount

    if (order.tokenGiveAdr === ETHER_ADDRESS) {
        etherAmount = order.amountGive
        tokenAmount = order.amountGet
    }
    else {
        etherAmount = order.amountGet
        tokenAmount = order.amountGive
    }

    // calculate token price to 5 decimal places
    const precision = 100000
    let tokenPrice = (etherAmount / tokenAmount)
    tokenPrice = Math.round(tokenPrice * precision) / precision

    return ({
        ...order,
        etherAmount: ethers(etherAmount),
        tokenAmount: tokens(tokenAmount),
        tokenPrice: tokenPrice,
        formatTime: moment.unix(order.timestamp).format('YYYY-MM-DD HH:mm:ss')
        
    })
}

const decorateFilledOrder = (order, preOrder) => {
    return ({
        ...order,
        tokenPriceClass: tokenPriceClass(order.tokenPrice, order.id, preOrder)
    })
}

const tokenPriceClass = (tokenPrice, orderId, preOrder) => {
    if(orderId === preOrder.id)
    {
        return GREEN
    }
    // Show green if tokenPrice > preOrder.tokenPrice
    if(tokenPrice >= preOrder.tokenPrice) {
        return GREEN
    } else {
        return RED
    }

    // Show red if tokenPrice < preOrder.tokenPrice

}